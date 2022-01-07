import React, {createRef, useEffect, useRef, useState} from 'react';
import {Dimensions, KeyboardAvoidingView, Platform, StyleSheet, ViewStyle} from 'react-native';

import { SafeAreaView } from 'react-native';
import QuillEditor, {
  EditorChangeData,
  EditorEventHandler,
  QuillToolbar,
} from 'react-native-cn-quill';
import { SelectionChangeData, SelectionChangeHandler } from 'react-native-cn-quill/lib/typescript/constants/editor-event';

//@ts-ignore
import io from 'socket.io-client';
import { config } from '../../config';
import { authService } from '../services/authService';
import WebView, {WebViewMessageEvent} from "react-native-webview";
import {Colors} from "../../assets/Colors";
import {SvgIcons} from "../../assets/IndexIcons";
import {ToolbarComponent} from "../components/toolbar/ToolbarComponent";
import {quill} from "../../assets/quill-editor/quill";
import {ZwibblerTool} from "../types/zwibblerTypes";
import {QuillTypes} from "../types/quillTypes";
import {ZwibblerManager} from "../../assets/zwibbler/zwibbler";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {QuillEditorEvent} from "../types/WebViewTypes";

const session = '61d6ed8510a97c0022ab6330';
const getSessionRoom = (): string => `sessions-${session}`;


export const DocEditorScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const [socket] = useState(io(config.webSocketUrl, {
    reconnectionDelayMax: 5000,
  }));

  const addSocketListeners = () => {
      socket.on('quillState', ({delta}: any) => {
          webViewRef.current?.postMessage(JSON.stringify({eventType: 'setContents', eventValue: delta}));
      });

      socket.on('partnerQuillDelta', ({delta}: any) => {
          webViewRef.current?.postMessage(JSON.stringify({eventType: 'updateContents', eventValue: delta}));
      });

      socket.on('quillPartnerSelection', ({range}: any) => {
          console.log('range', range);
          webViewRef.current?.postMessage(JSON.stringify({eventType: 'setSelection', eventValue: range}));
      })

    }


    useEffect(() => {
    (async () => {
      socket.disconnect();
      console.log('Fetching the user information');
      const {user} = await authService.login();
      socket.connect();
      console.log('Trying to connect to to the socket server');
      socket.on('connect', () => {
        console.log('connected');

        addSocketListeners();

        //RequestQuillState
        socket.emit('requestQuillState', {
          sessionId: session,
        });

        socket.emit(
            'join',
            {
              sessionId: session,
              user,
              joinedFrom: '',
            }
        )

        console.log('method_ends');
      });
    })();
  }, [socket]);



  const onMessage = (payload: WebViewMessageEvent) => {
    const data = JSON.parse(payload.nativeEvent.data);
    const event = data as QuillEditorEvent;
    if (event.eventType === 'text-change') {
      if (event.eventValue.source === 'user') {
              socket.emit('transmitQuillDelta', {
                sessionId: session,
                delta: event.eventValue.delta,
              });
            }
    } else if (event.eventType === 'selection-change') {
        if (event.eventValue.source === 'user') {
            console.log('emiting selection');
            socket.emit('transmitQuillSelection', {
                        sessionId: session,
                        range: data.eventValue.range,
                      })
        }
    }
  };

    return (
        <SafeAreaView style={styles.root}>
          <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <WebView
                style={styles.webView}
                javaScriptEnabled={true}
                ref={webViewRef}
                originWhitelist={['*']}
                cacheEnabled={true}
                onMessage={onMessage}
                source={{html: quill.html}}/>
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
