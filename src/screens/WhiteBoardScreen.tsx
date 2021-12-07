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
import WebView from 'react-native-webview';
import {zwibbler, ZwibblerManager} from '../../assets/zwibbler/zwibbler';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {WhiteboardToolsMenu} from "../components/white-board/WhiteboardToolsMenu";

type WhiteboardType = NativeStackScreenProps<MainStackParamList, 'Whiteboard'>;
export const WhiteBoardScreen: React.FC<WhiteboardType> = () => {
  const [selectedToolId, setSelectedToolId] = useState<number | undefined>(1);
  const [textModalProps, setTextModalProps] = useState<IZwibblerTextModal>({
    visible: false,
  });
  const zwibblerManager = new ZwibblerManager();
  const webViewRef = useRef<WebView>(null);
  useEffect(() => zwibblerManager.setWebView(webViewRef), [webViewRef]);
  const tools = [
    {
      id: 1,
      name: 'Pick',
      icon: SvgIcons.DragIcon,
      handler: () => setSelectedToolId(1),
    },
    {
      id: 2,
      name: 'Brush',
      icon: SvgIcons.PencilIcon,
      handler: () => setSelectedToolId(2),
    },
    {
      id: 3,
      name: 'Color',
      icon: SvgIcons.DotIcon,
      handler: () => {
        const color = 'pink';
        callMethod(`zwibbler.setColour('${color}', true)`);
      },
    },
    {
      id: 4,
      name: 'Rectangle',
      icon: SvgIcons.ShapeIcon,
      subMenu: () => (
        <View
          style={{
            position: 'absolute',
            top: -60,
            height: 52,
            width: 200,
            left: -80,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#D8DEE5',
            paddingHorizontal: 6,
          }}
        >
          <SvgIcons.DragIcon />
          <SvgIcons.DragIcon />
          <SvgIcons.DragIcon />
          <SvgIcons.DragIcon />
        </View>
      ),
      handler: () => setSelectedToolId(4),
    },
    {
      id: 5,
      name: 'Font',
      icon: SvgIcons.TextIcon,
      handler: () => {
        setTextModalProps({
          visible: true,
          onModalClose,
        });
      },
    },
    {
      id: 6,
      name: 'Image',
      icon: SvgIcons.PhotoUploadIcon,
      handler: () => setSelectedToolId(6),
    },
  ];

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

  useEffect(() => {
    if (selectedToolId) {
      const control = tools.find((x) => x.id === selectedToolId)!;
      callMethod(`zwibbler.use${control.name}Tool()`);
    }
  }, [selectedToolId]);

  const callMethod = (script: string): void => {
    webViewRef.current?.injectJavaScript(script);
  };

  const onModalClose = (text?: string) => {
    if (text) {
      callMethod(`addText('${text}')`);
    }
    setTextModalProps({
      visible: false,
    });
  };

  const onMessage = (payload: any) => {
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) {
      console.log('salio por el catch');
    }
    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
      } else {
        console.log(dataPayload);
      }
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
          {/*{tools.map((tool) => (*/}
          {/*  <View key={tool.id} style={{ backgroundColor: 'pink' }}>*/}
          {/*    {tool.subMenu && <tool.subMenu />}*/}
          {/*    <TouchableOpacity*/}
          {/*      onPress={tool.handler}*/}
          {/*      style={[*/}
          {/*        styles.iconWrapper,*/}
          {/*        selectedToolId === tool.id && styles.selectedIconWrapper,*/}
          {/*      ]}*/}
          {/*    >*/}
          {/*      {<tool.icon height={26} width={26} />}*/}
          {/*    </TouchableOpacity>*/}
          {/*  </View>*/}
          {/*))}*/}
          <WhiteboardToolsMenu zwibblerManager={zwibblerManager}/>
          {/*<Menu>*/}
          {/*  <MenuTrigger>*/}
          {/*    {<SvgIcons.DragIcon height={26} width={26} />}*/}
          {/*  </MenuTrigger>*/}
          {/*  <MenuOptions*/}
          {/*    customStyles={{*/}
          {/*      optionsWrapper: { flexDirection: 'row' },*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <MenuOption onSelect={() => alert(`Save`)}>*/}
          {/*      <SvgIcons.PencilIcon height={26} width={26}/>*/}
          {/*    </MenuOption>*/}
          {/*    <MenuOption onSelect={() => alert(`Delete`)}>*/}
          {/*      <Text style={{ color: 'red' }}>Delete</Text>*/}
          {/*    </MenuOption>*/}
          {/*    <MenuOption*/}
          {/*      onSelect={() => alert(`Not called`)}*/}
          {/*      disabled={true}*/}
          {/*      text="Disabled"*/}
          {/*    />*/}
          {/*  </MenuOptions>*/}
          {/*</Menu>*/}
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
