import WebView from 'react-native-webview'
import React from 'react'
import { config } from '../../config'
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'
import { sessionService } from '../../src/services/sessionService'

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
            autoPickTool: false,
            autoPickToolText: false,
            defaultBrushWidth: 5,
            multilineText: true,
            zoomOnResize: false,
            collaborationServer: '${config.whiteboardSocketUrl}/whiteboard/room/'+sessionId,
            pageView: true,
            pageBorderColour: 'transparent',
            pageInflation: 0,
            pageShadow: false,
            useTouch: true,
            allowZoom: false,
            outsidePageColour: '#E5E5E5',
            defaultSmoothness: 'sharpest',
            defaultZoom: 'width'
        });

        zwibbler.setPaperSize(1000, 2800);
        zwibbler.removeSelectionHandles();

        const imageUrl = 'https://i.postimg.cc/MTnNZDZ7/Trash.png';
        zwibbler.addSelectionHandle(1.0, 0.0, 20, -30, imageUrl, function (pageX, pageY) {
            zwibbler.deleteSelection();
        });


        const rotateIConUrl = 'https://i.postimg.cc/Qxg8rXyX/Group-1086352.png';
        zwibbler.addSelectionHandle(0.5, 0.0, 0, -30, rotateIConUrl, 'rotate');

        /* Position scaling handles at all four corners of the selection. */
        zwibbler.addSelectionHandle(0.0, 0.0, 0, 0, '', 'scale')
        zwibbler.addSelectionHandle(1.0, 0.0, 0, 0, '', 'scale')
        zwibbler.addSelectionHandle(1.0, 1.0, 0, 0, '', 'scale')
        zwibbler.addSelectionHandle(0.0, 1.0, 0, 0, '', 'scale')
        zwibbler.addSelectionHandle(0.5, 0.0, 0, 0, '', 'scale')
        zwibbler.addSelectionHandle(1.0, 0.5, 0, 0, '', 'scale')
        zwibbler.addSelectionHandle(0.5, 1.0, 0, 0, '', 'scale')
        zwibbler.addSelectionHandle(0.0, 0.5, 0, 0, '', 'scale')

        zwibbler.on("tool-changed", function(toolName) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ eventType: 'tool-changed', eventValue: toolName }));
        });

        zwibbler.on("document-changed", function() {
          window.ReactNativeWebView.postMessage(JSON.stringify({ eventType: 'document-changed', eventValue: {
            canUndo: zwibbler.canUndo(),
            canRedo: zwibbler.canRedo(),
          } }));
        });

        zwibbler.on("resource-loaded", function() {
          window.ReactNativeWebView.postMessage(JSON.stringify({ eventType: 'resource-loaded' }));
        });

        zwibbler.joinSharedSession(sessionId, true).then(response => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ eventType: 'connected', eventValue: true }));
        }).catch(err => {
            console.error('err', err);
        });

        zwibbler.on('connected', () => {
          zwibbler.useBrushTool();
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
`

export const zwibbler = {
  html,
}

export class ZwibblerManager {
  private webView: React.RefObject<WebView<{}>>

  constructor(webView?: React.RefObject<WebView<{}>>) {
    if (webView) {
      this.webView = webView
    }
  }

  init = (sessionId: string): void => {
    this.webView.current?.injectJavaScript(`init('${sessionId}');`)
  }
  addText = (text: string): void => {
    this.webView.current?.injectJavaScript(`addText('${text}');`)
  }

  useBrushTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useBrushTool();')
  }

  usePickTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.usePickTool();')
  }

  useLineTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useLineTool();')
  }

  useCircleTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useCircleTool();')
  }

  usePolygonTool = (sides: number = 3, rotation: number = Math.PI): void => {
    this.webView.current?.injectJavaScript(
      `zwibbler.usePolygonTool(${sides}, ${rotation});`
    )
  }

  useRectangleTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useRectangleTool();')
  }

  useTextTool = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.useTextTool();')
  }

  changeColor = (color: string) => {
    this.webView.current?.injectJavaScript(
      `zwibbler.setColour('${color}', true);`
    )
  }

  undo = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.undo();')
  }

  redo = (): void => {
    this.webView.current?.injectJavaScript('zwibbler.redo();')
  }

  pickImage = async (): Promise<ImagePicker.ImagePickerResult> => {
    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: false,
      base64: true,
    })
  }

  uploadImage = async (
    sessionId: string,
    image: ImagePicker.ImagePickerAsset
  ): Promise<void> => {
    try {
      const response = await sessionService.getSessionPhotoUploadUrl(sessionId)
      const { uploadUrl, imageUrl } = response
      if (uploadUrl) {
        // iOS prepends their file paths with 'file://'. We're removing it
        // because this has been found to sometimes break file uploads
        const fileUri =
          Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri
        // get the MIME type for the file
        const fileType = `image/${image.uri.split('.').pop()}`

        // We needed to push out an emergency update and everything that wasn't hacky
        // required a Pod install. We will remove the use of `FormData` and utilize
        // rn-fetch-blob instead
        // TODO: remove
        const data = new FormData()
        // @ts-ignore
        data.append('file', {
          name: fileUri,
          type: fileType,
          uri: fileUri,
        })

        // We're keeping the original shape of this function because we intend to use
        // rn-fetch-blob instead of FormData
        await sessionService.uploadSessionPhotoToStorage(
          uploadUrl,
          fileUri,
          fileType,
          // TODO: remove. hacky away to access the actual file in FormData
          // @ts-expect-error
          data._parts[0][1]
        )

        // logs a warning locally, but it does upload the image
        this.webView.current?.injectJavaScript(
          `zwibbler.insertImage({ 'url': '${imageUrl}' });`
        )
      } else throw new Error('No photo upload URL')
    } catch (error) {
      throw new Error(
        'We had trouble loading your image to the whiteboard. Please try again.'
      )
    }
  }

  reset = () => {
    this.webView.current?.injectJavaScript(
      'zwibbler.deleteNodes(zwibbler.getAllNodes())'
    )
  }
}
