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

const session = '61ca106910a97c0022aaa816';
const getSessionRoom = (): string => `sessions-${session}`;


export const DocEditorScreen = () => {
  const webViewRef = useRef<WebView>(null);
  // const [editorManager, setEditorManager] = useState<QuillManager>();
  // const [selectedTool, setSelectedTool] = useState<string | undefined>();
  // const [socket] = useState(io(config.webSocketUrl, {
  //   reconnectionDelayMax: 5000,
  // }));

  // const handleQuillEditorEvents = () => {
  //
  //   _editor.current?.on('text-change', ({delta, _, source}: any) => {
  //     if (source === 'user') {
  //       console.log('emiting');
  //       socket.emit('transmitQuillDelta', {
  //         sessionId: session,
  //         delta,
  //       });
  //     }
  //   });
  //
  //   _editor.current?.on('selection-change', (data: SelectionChangeData) => {
  //     if (data.source === 'user') {
  //       socket.emit('transmitQuillSelection', {
  //         sessionId: session,
  //         range: data.range,
  //       })
  //     }
  //   })
  //
  // };
  //
  // const addSocketListeners = () => {
  //   socket.on('quillState', ({delta}: any) => {
  //     _editor.current?.setContents(delta);
  //   });
  //
  //   socket.on('partnerQuillDelta', ({delta}: any) => {
  //     _editor.current?.updateContents(delta);
  //   });
  //
  //   socket.on('quillPartnerSelection', ({range}: any) => {
  //     console.log('range changed', range);
  //     _editor.current?.setSelection(range.index, range.length);
  //   })
  //
  // }
  //
  // useEffect(() => {
  //   (async () => {
  //     console.log('Fetching the user information');
  //     const {user} = await authService.login();
  //     socket.connect();
  //     console.log('Trying to connect to to the socket server');
  //     socket.on('connect_error', (error: any) => {
  //       console.log('connection error', error);
  //     });
  //     socket.on('connect', () => {
  //       console.log('connected');
  //
  //       addSocketListeners();
  //
  //       socket.on('error', (error: any) => {
  //         console.log('Error!', error);
  //       });
  //       socket.on('redirect', (e: any) => {
  //         console.log('Redirect event happened', e);
  //       });
  //
  //       //RequestQuillState
  //       socket.emit('requestQuillState', {
  //         sessionId: session,
  //       });
  //
  //       socket.emit(
  //           'join',
  //           {
  //             sessionId: session,
  //             user,
  //             joinedFrom: '',
  //           }
  //       )
  //
  //       console.log('method_ends');
  //     });
  //   })();
  // }, [socket]);
  //
  // useEffect(() => {
  //   handleQuillEditorEvents();
  // }, [_editor]);
  //
  // useEffect(() => {
  //   socket?.disconnect();
  // }, []);
  //
  // const customStyles = {
  //   toolbar: {
  //     provider: (provided: any) => ({
  //       ...provided,
  //       borderTopWidth: 0,
  //     }),
  //     root: (provided: any) => ({
  //       ...provided,
  //       backgroundColor: 'white',
  //
  //     }),
  //   },
  // };

  // type Props = {
  //   style?: ViewStyle
  //   defaultValue?: string
  //   options?: any
  //   onChange?: (quill-editor: string) => void
  // }
  //
  // const defaultValue = [[{header: [1, 2, false]}], ['bold', 'italic', 'underline'], ['image', 'code-block']];
  //
  // const Quill = (props: Props) => {
  //   const options = JSON.stringify({
  //     placeholder: 'Type here...',
  //     modules: {
  //       toolbar: defaultValue,
  //     },
  //     ...props.options,
  //     theme: 'snow',
  //   })
  //   const injectedJavaScriptBeforeContentLoaded = `window.options=${options}`
  //   const injectedJavaScript = `document.querySelector('#editor').children[0].innerHTML="${props.defaultValue}"`
  //
  //
  //   const onMessage = (e: WebViewMessageEvent) => {
  //     const data = JSON.parse(e.nativeEvent.data)
  //     if (data.type === 'onChange') {
  //       // @ts-ignore
  //       props.onChange(data.message)
  //     }
  //   }
  //
  //   // @ts-ignore
  //   Quill.defaultProps = {
  //     style: {},
  //     defaultValue: '',
  //     onChange: () => {
  //     },
  //     options: {},
  //   }

  const onMessage = (payload: WebViewMessageEvent) => {
    const data = JSON.parse(payload.nativeEvent.data);
    console.log('data', data);
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

          {/*    <QuillToolbar editor={_editor} options={[*/}
          {/*    [{ 'header': [1, 2, false] }],*/}
          {/*    [{ 'list': 'ordered'}, { 'list': 'bullet' }],*/}
          {/*]} theme="light" />*/}
          {/*<QuillEditor*/}
          {/*  style={styles.editor}*/}
          {/*  ref={_editor}*/}
          {/*  quill={{*/}
          {/*    modules: {*/}
          {/*      toolbar: [*/}
          {/*        [*/}
          {/*          { header: [1, 2, false] },*/}
          {/*          { list: 'ordered' },*/}
          {/*          { list: 'bullet' },*/}
          {/*        ],*/}
          {/*      ],*/}
          {/*    },*/}
          {/*    placeholder: 'Type or paste something...',*/}
          {/*    theme: 'snow',*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<QuillToolbar*/}
          {/*  editor={_editor}*/}
          {/*  options={[*/}
          {/*    ['bold', 'italic', 'underline', 'strike'],*/}
          {/*    [*/}
          {/*      { color: ['#000000', 'white', 'blue', 'red', 'green', 'yellow'] },*/}
          {/*      {*/}
          {/*        background: [*/}
          {/*          '#000000',*/}
          {/*          'white',*/}
          {/*          'blue',*/}
          {/*          'red',*/}
          {/*          'green',*/}
          {/*          'yellow',*/}
          {/*        ],*/}
          {/*      },*/}
          {/*    ],*/}
          {/*  ]}*/}
          {/*  theme={'light'}*/}
          {/*  styles={customStyles}*/}
          {/*/>*/}
          {/*<ToolbarComponent*/}
          {/*    selectedToolName={selectedTool as QuillTypes}*/}
          {/*    editorManager={editorManager!}/>*/}
          {/*<WebView*/}
          {/*    onMessage={onMessage}*/}
          {/*    source={Platform.OS === 'ios' ? require('../../assets/quill.quill-editor') : {uri: 'file:///android_asset/quill.quill-editor'}}*/}
          {/*    javaScriptEnabled*/}
          {/*    injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoaded}*/}
          {/*    injectedJavaScript={injectedJavaScript}*/}
          {/*    style={{*/}
          {/*      height: Dimensions.get('window').height - 42,*/}
          {/*      width: Dimensions.get('window').width, ...props.style*/}
          {/*    }}*/}
          {/*/>*/}
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
