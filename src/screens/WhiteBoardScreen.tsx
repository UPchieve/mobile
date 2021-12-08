import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { SvgIcons } from '../../assets/IndexIcons';
import {
  IZwibblerTextModal,
  WhiteboardTextPicker,
} from '../components/white-board/WhiteboardTextPicker';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { zwibbler, ZwibblerManager } from '../../assets/zwibbler/zwibbler';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import { WhiteboardToolsMenu } from '../components/white-board/WhiteboardToolsMenu';
import { CustomWebViewEvent } from '../types/WebViewTypes';
import { ZwibblerTool } from '../types/zwibblerTypes';

type WhiteboardType = NativeStackScreenProps<MainStackParamList, 'Whiteboard'>;
export const WhiteBoardScreen: React.FC<WhiteboardType> = () => {
  const [selectedTool, setSelectedTool] = useState<string | undefined>();
  const [textModalProps, setTextModalProps] = useState<IZwibblerTextModal>({
    visible: false,
  });
  const [zwibblerManager, setZwibblerManager] = useState<ZwibblerManager>();
  const webViewRef = useRef<WebView>(null);
  useEffect(() => {
    setZwibblerManager(new ZwibblerManager(webViewRef));
  }, [webViewRef]);

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;

  const openTextModal = (): Promise<string | undefined> => {
    return new Promise<string | undefined>((resolve) => {
      setTextModalProps({
        visible: true,
        onModalClose: (text) => {
          resolve(text);
          setTextModalProps({ visible: false });
        },
      });
    });
  };

  const onMessage = (payload: WebViewMessageEvent) => {
    const data = JSON.parse(payload.nativeEvent.data) as CustomWebViewEvent;
    if (data.eventType === 'tool-changed') {
      setSelectedTool(data.eventValue);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MenuProvider>
        <View style={styles.topToolsWrapper}>
          <View style={styles.chatIconWrapper}>
            <SvgIcons.WordBubbleIcon stroke={'white'} width={27} height={24} />
          </View>
          <View style={styles.rightTopPanelWrapper}>
            <SvgIcons.UndoIcon stroke={'gray'} style={{ marginRight: 30 }} />
            <SvgIcons.RedoIcon stroke={'gray'} style={{ marginRight: 30 }} />
            <SvgIcons.TrashIcon stroke="gray" style={{ marginRight: 14 }} />
          </View>
        </View>
        <View style={styles.body}>
          <WebView
            style={styles.webView}
            javaScriptEnabled={true}
            injectedJavaScript={debugging}
            onMessage={onMessage}
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: zwibbler.html }}
          />
        </View>
        <View style={styles.bottomToolsWrapper}>
          <WhiteboardToolsMenu
            zwibblerManager={zwibblerManager!}
            openTextEditor={openTextModal}
            selectedToolName={selectedTool as ZwibblerTool}
          />
        </View>
        <WhiteboardTextPicker {...textModalProps} />
      </MenuProvider>
    </SafeAreaView>
  );
};

const lightGrayColor = '#F1F3F6';
const greenColor = '#16D2AA';
const darkGray = '#D8DEE6';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: lightGrayColor,
  },
  webView: {
    width: '100%',
  },
  topToolsWrapper: {
    height: 48,
    backgroundColor: lightGrayColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatIconWrapper: {
    backgroundColor: greenColor,
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightTopPanelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolsWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  tool: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  toolSelected: {
    backgroundColor: 'yellowgreen',
  },
  body: {
    flexGrow: 1,
    backgroundColor: darkGray,
    padding: 5,
    paddingTop: 8,
  },
  bottomToolsWrapper: {
    height: 48,
    backgroundColor: lightGrayColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
    marginLeft: 5,
    marginRight: 10,
  },
  iconWrapper: {
    padding: 10,
  },
  selectedIconWrapper: {
    backgroundColor: darkGray,
  },
});
