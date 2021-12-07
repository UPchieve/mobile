import WebView from 'react-native-webview';
import React from 'react';

const html = `
<html>
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
        const zwibbler = Zwibbler.create("#zwibbler", {
            showToolbar: false,
            showColourPanel: false,
        });
        
        //Add the red icon to delete the current selection.
        const imageUrl = 'https://i.postimg.cc/1zcngcSk/Group-718.png';
        zwibbler.addSelectionHandle(0.0, 0.0, -15, -15, imageUrl, function (pageX, pageY) {
            zwibbler.deleteSelection();
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
        
    </script>
</body>

</html>
`;

export const zwibbler = {
  html,
};

export class ZwibblerManager {
  private webView: React.RefObject<WebView<{}>>;

  constructor();
  constructor(webView?: React.RefObject<WebView<{}>>) {
    if (webView) {
      this.webView = webView;
    }
  }

  setWebView(webView: React.RefObject<WebView<{}>>) {
    this.webView = webView;
  }

  useBrushTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useBrushTool()');
  };

  usePickTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.usePickTool()');
  };

  changeColor = (color: string) => {
    console.log('changing color to '+color);
    this.webView.current?.injectJavaScript(
      `zwibbler.setColour('${color}', true)`
    );
  };
}
