import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native';

//@ts-ignore
import { authService } from '../services/authService';
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { quill } from "../../assets/quill-editor/quill";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { QuillEditorEvent } from "../types/WebViewTypes";
import { AuthContext } from '../providers/AuthProvider';
import { ImageIndex } from '../../assets/ImageIndex';
import { CommonKeyboardAvoidingView } from '../components/common/CommonKeyboardAvoidingView';
import { SvgIcons } from '../../assets/IndexIcons';
import { Colors } from '../../assets/Colors';


// type WhiteboardType = NativeStackScreenProps<MainStackParamList, 'DocEditor'>;
type DocEditorType = {
  sessionId: string
  onSwitchPress: () => void;
}
export const DocEditorScreen: React.FC<DocEditorType> = ({ sessionId, onSwitchPress }) => {
  const webViewRef = useRef<WebView>(null);
  // const { sessionId } = route.params;
  const { socketHandler } = useContext(AuthContext);

  const addSocketListeners = () => {
    const l1 = socketHandler.on('quillState', ({ delta }: any) => {
      webViewRef.current?.postMessage(JSON.stringify({ eventType: 'setContents', eventValue: delta }));
    });

    const l2 = socketHandler.on('partnerQuillDelta', ({ delta }: any) => {
      webViewRef.current?.postMessage(JSON.stringify({ eventType: 'updateContents', eventValue: delta }));
    });

    const l3 = socketHandler.on('quillPartnerSelection', ({ range }: any) => {
      console.log('range', range);
      webViewRef.current?.postMessage(JSON.stringify({ eventType: 'setSelection', eventValue: range }));
    })
    return () => [l1, l2, l3].forEach(x => x());
  }


  useEffect(() => {
    console.log('executed effect');
    return () => console.log('closed efffect');
  }, []);


  useEffect(() => {
    let unsubscribe: any;
    (async () => {
      // socket.disconnect();
      console.log('Fetching the user information');
      const { user } = await authService.login();
      // socket.connect();
      console.log('Trying to connect to to the socket server');
      unsubscribe = addSocketListeners();

      //RequestQuillState
      socketHandler.emit('requestQuillState', {
        sessionId: sessionId,
      });

      socketHandler.emit(
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
  }, []);

  useEffect(() => {
    if (webViewRef) {
      webViewRef.current?.postMessage(JSON.stringify({ eventType: 'hideToolBar' }));
    }
  }, [webViewRef]);

  const onMessage = (payload: WebViewMessageEvent) => {
    const data = JSON.parse(payload.nativeEvent.data);
    const event = data as QuillEditorEvent;
    if (event.eventType === 'text-change') {
      if (event.eventValue.source === 'user') {
        socketHandler.emit('transmitQuillDelta', {
          sessionId: sessionId,
          delta: event.eventValue.delta,
        });
      }
    } else if (event.eventType === 'selection-change') {
      if (event.eventValue.source === 'user') {
        console.log('emiting selection');
        socketHandler.emit('transmitQuillSelection', {
          sessionId: sessionId,
          range: data.eventValue.range,
        })
      }
    }
  };

  return (
    <View style={styles.root}>
      {/* <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}> */}
      <View style={{ flex: 1, }}>
        <WebView
          style={styles.webView}
          javaScriptEnabled={true}
          ref={webViewRef}
          originWhitelist={['*']}
          cacheEnabled={true}
          onMessage={onMessage}
          source={{ html: quill.html }} />
      </View>
      {/* </KeyboardAwareScrollView> */}
      <TouchableOpacity style={styles.swapIcon} onPress={onSwitchPress}>
        {/* <Image source={ImageIndex.icons.chatEditor} /> */}
        <SvgIcons.WordBubbleIcon stroke={'white'} width={24} height={24} />
      </TouchableOpacity>
    </View>
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
  webView: {
    flex: 1,
  },
  swapIcon: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.success,
    position: 'absolute',
    top: 5,
    right: 10,
  }
});
