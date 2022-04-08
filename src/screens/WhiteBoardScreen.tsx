import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet, Pressable, StatusBar, Platform
} from 'react-native';
import { SvgIcons } from '../../assets/IndexIcons';
import {
  IZwibblerTextModal,
  WhiteboardTextPicker,
} from '../components/white-board/WhiteboardTextPicker';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { zwibbler, ZwibblerManager } from '../../assets/zwibbler/zwibbler';
import { WhiteboardToolsMenu } from '../components/white-board/WhiteboardToolsMenu';
import { CustomWebViewEvent, WebViewEvent } from '../types/WebViewTypes';
import { ZwibblerTool } from '../types/zwibblerTypes';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../assets/Colors';
import { AlertContext, AlertProvider } from '../providers/AlertProvider';
import { useOrientation } from '../hooks/useOrientation';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type WhiteboardType = {
  sessionId: string,
  onSwitchPress: () => void;
  hasNotifications: boolean
}

//TODO TWO FINGERS SCROLL.
//TODO IN THE FEEDBACK TEXTAREA DOESN'T WORK.
export const WhiteBoardScreen: React.FC<WhiteboardType> = ({ sessionId, onSwitchPress, hasNotifications }) => {
  const { orientation, notchPosition } = useOrientation()

  const insets = useSafeAreaInsets();

  const [selectedTool, setSelectedTool] = useState<string | undefined>();
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false)
  const [textModalProps, setTextModalProps] = useState<IZwibblerTextModal>({
    visible: false,
  });

  const { showPrompt } = useContext(AlertContext);
  const [zwibblerManager, setZwibblerManager] = useState<ZwibblerManager>();
  const webViewRef = useRef<WebView>(null);
  useEffect(() => {
    const zwibblerManager = new ZwibblerManager(webViewRef);
    setZwibblerManager(zwibblerManager);
  }, [webViewRef]);

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

  useEffect(() => {
    console.log(notchPosition);

  }, [notchPosition])

  const openDeleteModal = () => {
    showPrompt({
      type: 'error',
      title: 'Clear Whiteboard',
      text: 'You will not be able to undo.',
      icon: SvgIcons.TrashIcon,
      confirmText: 'Clear',
      cancelText: 'Cancel',
      onConfirm: () => zwibblerManager?.reset()
    });
  };

  const onMessage = (payload: WebViewMessageEvent) => {
    // const data = JSON.parse(payload.nativeEvent.data) as CustomWebViewEvent<string>;
    // if (data.eventType === 'tool-changed') {
    //   setSelectedTool(data.eventValue);
    // }
    const event = JSON.parse(payload.nativeEvent.data) as WebViewEvent;
    switch (event.eventType) {
      case 'tool-changed':
        const concreteEventData = event as CustomWebViewEvent<string>;
        setSelectedTool(concreteEventData.eventValue);
        break;
      case 'connected':
        handleOnConnected(event as CustomWebViewEvent<boolean>);
        break;
      case 'document-changed':
        handleOnDocumentChanged(event as CustomWebViewEvent<any>);
        break;
    }
  };

  const renderWebView = () => {
    return <WebView
      androidHardwareAccelerationDisabled={true}
      style={styles.webView}
      javaScriptEnabled={true}
      onLoadEnd={() => webViewRef.current?.injectJavaScript(`init('${sessionId}');`)}
      onMessage={onMessage}
      ref={webViewRef}
      originWhitelist={['*']}
      cacheEnabled={true}
      source={{ html: zwibbler.html }}
    />
  }

  const handleOnConnected = (event: CustomWebViewEvent<boolean>) => {
    if (event.eventValue) {
      //alert('connected');
    }
  };

  const handleOnDocumentChanged = (event: CustomWebViewEvent<{ canUndo: boolean, canRedo: boolean }>) => {
    setCanUndo(event.eventValue.canUndo);
    setCanRedo(event.eventValue.canRedo);
  }

  const renderSwapToChatIcon = () => {
    return <Pressable style={styles.chatIconWrapper} onPress={() => {
      zwibblerManager?.useBrushTool();
      onSwitchPress();
    }}>
      <View>
        <SvgIcons.WordBubbleIcon stroke={'white'} width={27} height={24} />
        <View style={hasNotifications && styles.notificationRedBall} />
      </View>
    </Pressable>
  }

  const renderWhiteboard = () => {
    if (orientation === "PORTRAIT") {
      return <>
        <View style={styles.topToolsWrapper}>
          {renderSwapToChatIcon()}
          <View style={styles.rightTopPanelWrapper}>
            <TouchableOpacity onPress={zwibblerManager?.undo} disabled={!canUndo}>
              <SvgIcons.UndoIcon stroke={canUndo ? Colors.softBlack : Colors.disabledGray} style={{ marginRight: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={zwibblerManager?.redo} disabled={!canRedo}>
              <SvgIcons.RedoIcon stroke={canRedo ? Colors.softBlack : Colors.disabledGray} style={{ marginRight: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openDeleteModal}>
              <SvgIcons.TrashIcon
                stroke={Colors.error}
                style={{ marginRight: 14 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          {renderWebView()}
        </View>
        <View style={styles.bottomToolsWrapper}>
          <WhiteboardToolsMenu
            zwibblerManager={zwibblerManager!}
            orientation={orientation}
            selectedToolName={selectedTool as ZwibblerTool}
          />
        </View>
        <WhiteboardTextPicker {...textModalProps} />
      </>
    } else {
      return <>
        <SafeAreaView>
        <View style={[styles.topToolsWrapper, {
          paddingRight: insets.right,
        }]}>
          {renderSwapToChatIcon()}
          <View style={styles.rightTopPanelWrapper}>
            <View style={styles.topToolsWrapperLandscape}>
              <WhiteboardToolsMenu
                zwibblerManager={zwibblerManager!}
                orientation={orientation}
                selectedToolName={selectedTool as ZwibblerTool}
              />
            </View>
            <WhiteboardTextPicker {...textModalProps} />
          </View>
          <TouchableOpacity onPress={zwibblerManager?.undo} style={{ marginLeft: 50 }} disabled={!canUndo}>
            <SvgIcons.UndoIcon stroke={canUndo ? Colors.softBlack : Colors.disabledGray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={zwibblerManager?.redo} style={{ marginLeft: -10 }} disabled={!canRedo}>
            <SvgIcons.RedoIcon stroke={canRedo ? Colors.softBlack : Colors.disabledGray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openDeleteModal}>
            <SvgIcons.TrashIcon
              stroke={Colors.error}
              style={{ marginRight: 14 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {renderWebView()}
        </View>
        </SafeAreaView>
      </>
    }
  }

  return (
    <View style={[styles.container, notchPosition === 'LEFT' ? {
      paddingLeft: insets.left,
     } : { paddingRight: insets.right },
     Platform.OS === 'android' && { top: StatusBar.currentHeight }
    ]}>
      {renderWhiteboard()}
    </View>
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
  topToolsWrapperLandscape: {
    height: 48,
    backgroundColor: lightGrayColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 3,
    marginLeft: 100,
    marginRight: 10,
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
  notificationRedBall: {
    backgroundColor: Colors.error,
    height: 12,
    width: 12,
    borderRadius: 100,
    position: 'absolute',
    right: -2,
    top: -3,
  }
});
