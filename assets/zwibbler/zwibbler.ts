import WebView from 'react-native-webview';
import React from 'react';
import { config } from '../../config';

const html = `
<html>
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
<style>
    #zwibbler{
        border: 1px solid transparent;
        height: 100%;
    }
</style>
<body>
<div id="zwibbler"></div>
<script src="https://cdn.upchieve.org/zwibbler/june2021/zwibbler2.js"></script>
<script type="text/javascript">
    let zwibbler;
    const init = (sessionId) => {
        zwibbler = Zwibbler.create("#zwibbler", {
            showToolbar: false,
            showColourPanel: false,
            multilineText: true,
            defaultZoom: 0.45,
            zoomOnResize: false,
            collaborationServer: '${config.socketUrl}/whiteboard/room/'+sessionId,
        });
        
        zwibbler.removeSelectionHandles();
        
        //Add the trash icon to delete the current selection.
        const imageUrl = 'https://i.postimg.cc/MTnNZDZ7/Trash.png';
        zwibbler.addSelectionHandle(1.0, 0.0, 20, -30, imageUrl, function (pageX, pageY) {
            zwibbler.deleteSelection();
        });
        
        //Add the rotate icon to rotate the current selection.
        const rotateIConUrl = 'https://i.postimg.cc/Qxg8rXyX/Group-1086352.png';
        zwibbler.addSelectionHandle(0.5, 0.0, 0, -30, rotateIConUrl, 'rotate');
        
        zwibbler.on("tool-changed", function(toolName) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ eventType: 'tool-changed', eventValue: toolName }));
        });

        zwibbler.on("document-changed", function() {
          window.ReactNativeWebView.postMessage(JSON.stringify({ eventType: 'document-changed', eventValue: {
            canUndo: zwibbler.canUndo(),
            canRedo: zwibbler.canRedo(),
          } }));
        });

        zwibbler.joinSharedSession(sessionId, true).then(response => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ eventType: 'connected', eventValue: true }));
        }).catch(err => {
            console.error('err', err);
        });
        
        const addText = (text) => {
            zwibbler.begin();
            const node = zwibbler.createNode("TextNode", {
                text,
                fontSize: 40,
                fontName: "Arial",
                lockSize: true,
            });
            zwibbler.setNodeProperty(node, 'lockRotation', true);
            zwibbler.translateNode(node, 100,100);
            zwibbler.commit();
        }

        window.addEventListener('message', (e) => {
          const data = JSON.parse(e.data);
          alert(e);
      });
    }
    </script>
</body>

</html>
`;

// if(data.eventType === 'setProperty'){

// }
export const zwibbler = {
  html,
};

export class ZwibblerManager {
  private webView: React.RefObject<WebView<{}>>;

  constructor(webView?: React.RefObject<WebView<{}>>) {
    if (webView) {
      this.webView = webView;
    }
  }

  init = (sessionId: string): void => {
    this.webView.current?.injectJavaScript(`init('${sessionId}');`);
  };
  addText = (text: string): void => {
    this.webView.current?.injectJavaScript(`addText('${text}');`);
  };

  useBrushTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useBrushTool();');
  };

  usePickTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.usePickTool();');
  };

  useLineTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useLineTool();');
  };

  useCircleTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useCircleTool();');
  };

  usePolygonTool = (sides: number = 3, rotation: number = Math.PI): void => {
    this.webView.current?.injectJavaScript(
      `zwibbler.usePolygonTool(${sides}, ${rotation});`
    );
  };

  useRectangleTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useRectangleTool();');
  };

  useTextTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useTextTool();');
  };

  changeColor = (color: string) => {
    this.webView.current?.injectJavaScript(
      `zwibbler.setColour('${color}', true);`
    );
  };

  undo = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.undo();');
  };

  redo = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.redo();');
  };

  pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    //
    // console.log(result);
    //
    // if (!result.cancelled) {
    //   console.log(result.uri);
    // }
    this.webView.current?.injectJavaScript('zwibbler.insertImage()');
  };

  reset = () => {
    this.webView.current?.injectJavaScript(
      'zwibbler.deleteNodes(zwibbler.getAllNodes())'
    );
  };
}
