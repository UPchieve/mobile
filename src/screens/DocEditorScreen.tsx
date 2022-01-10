import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, ViewStyle } from 'react-native';

import { SafeAreaView } from 'react-native';
import QuillEditor, {
  EditorChangeData,
  EditorEventHandler,
  QuillToolbar,
} from 'react-native-cn-quill';
import { SelectionChangeData, SelectionChangeHandler } from 'react-native-cn-quill/lib/typescript/constants/editor-event';

//@ts-ignore
import { config } from '../../config';
import { authService } from '../services/authService';
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { Colors } from "../../assets/Colors";
import { SvgIcons } from "../../assets/IndexIcons";
import { ToolbarComponent } from "../components/toolbar/ToolbarComponent";
import { quill } from "../../assets/quill-editor/quill";
import { ZwibblerTool } from "../types/zwibblerTypes";
import { QuillTypes } from "../types/quillTypes";
import { ZwibblerManager } from "../../assets/zwibbler/zwibbler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { QuillEditorEvent } from "../types/WebViewTypes";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { SocketContextComponent } from '../providers/SocketProvider';
import { useFocusEffect } from '@react-navigation/native';


type WhiteboardType = NativeStackScreenProps<MainStackParamList, 'DocEditor'>;
export const DocEditorScreen: React.FC<WhiteboardType> = ({ route }) => {
  const webViewRef = useRef<WebView>(null);
  const { sessionId } = route.params;
  const { connected, on, emit } = useContext(SocketContextComponent);

  const addSocketListeners = () => {
    const l1 = on('quillState', ({ delta }: any) => {
      webViewRef.current?.postMessage(JSON.stringify({ eventType: 'setContents', eventValue: delta }));
    });

    const l2 = on('partnerQuillDelta', ({ delta }: any) => {
      webViewRef.current?.postMessage(JSON.stringify({ eventType: 'updateContents', eventValue: delta }));
    });

    const l3 = on('quillPartnerSelection', ({ range }: any) => {
      console.log('range', range);
      webViewRef.current?.postMessage(JSON.stringify({ eventType: 'setSelection', eventValue: range }));
    })
    return () => [l1, l2, l3].forEach(x => x());
  }


  useEffect(() => {

  }, []);


  useFocusEffect(() => {
    let unsubscribe: any;
    (async () => {
      // socket.disconnect();
      console.log('Fetching the user information');
      const { user } = await authService.login();
      // socket.connect();
      console.log('Trying to connect to to the socket server');
      unsubscribe = addSocketListeners();

      //RequestQuillState
      emit('requestQuillState', {
        sessionId: sessionId,
      });

      emit(
        'join',
        {
          sessionId: sessionId,
          user,
          joinedFrom: '',
        }
      )
    })();
    return () => {
      unsubscribe();
    }
  });


  const onMessage = (payload: WebViewMessageEvent) => {
    const data = JSON.parse(payload.nativeEvent.data);
    const event = data as QuillEditorEvent;
    if (event.eventType === 'text-change') {
      if (event.eventValue.source === 'user') {
        emit('transmitQuillDelta', {
          sessionId: sessionId,
          delta: event.eventValue.delta,
        });
      }
    } else if (event.eventType === 'selection-change') {
      if (event.eventValue.source === 'user') {
        console.log('emiting selection');
        emit('transmitQuillSelection', {
          sessionId: sessionId,
          range: data.eventValue.range,
        })
      }
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <WebView
          style={styles.webView}
          javaScriptEnabled={true}
          ref={webViewRef}
          originWhitelist={['*']}
          cacheEnabled={true}
          onMessage={onMessage}
          source={{ html: quill.html }} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  root: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#FFF',
  },
  editor: {
    flex: 1,
    padding: 0,
    width: Dimensions.get('window').width,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  webView: {
    width: '100%',
  },
});
