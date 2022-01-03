import WebView from 'react-native-webview';
import React from 'react';

const html = `
<html>
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
<link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
<style>
.ql-toolbar.ql-snow {
        padding: 4px 0 0 0;
        height: 50px;
        border: 0px;
    }
    
    .ql-editor {
        border-top: 1px solid #F5F4F4;
    }
    
    .ql-container.ql-snow {
        border-bottom: 1px solid #F5F4F4;
        border-left: 0px;
        border-right: 0px;
    }

#toolbar :first-child {
    margin-left: 1px;
}

#editor {
    width: 100%;
    height: 85vh;
}

#subToolbar {
    display: table;
    border-top: 8px solid #fff;
    padding: 4px 8px;
    width: 100%;
    background-color: #fff;
    bottom: 0;
    transform: translateY(87vh);
}

#subToolbar :first-child {
    margin-left: 0px;
}

#subToolbar button {
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-weight: 500;
    font-size: 24px;
    height: 28px;
    width: auto;
    color: #444;
}

#subToolbar #select {
    height: 20px;
    width: 35px;
    color: #444;
}

#subToolbar button:hover {
    color: #06c;
    font-size: 24px;
}

.wrapper-toolbar {
display: flex;
justify-content: space-between;
}

.mr-15 {
margin-right: 15px;
}

.ql-picker-item.ql-primary {
     border-radius: 100%;
}
    
.ql-picker-options {
     position: absolute;
     top: -35px;
     left: -130px
}
    
    #toolbar>span:nth-child(1)>span>span.ql-picker-options {
        position: absolute;
        top: 25px;
        left: 0;
        z-index: 1;
    }
    
    .ql-color.ql-picker.ql-color-picker {
        height: 20px;
        width: 35px;
        color: #444;
    }


</style>
<body>
    <div id="toolbar">
        <span class="ql-formats">
      <select class="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option selected></option>
      </select>
    </span>
        <span class="ql-formats">
      <button type="button" class="ql-list" value="ordered"></button>
      <button type="button" class="ql-list" value="bullet"></button>
    </span>
        <div id="subToolbar">
        <div class="wrapper-toolbar">
        <div class="wrapper-box">
            <button class="ql-bold mr-15"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
        </div>
        <div class="wrapper-background-box">
        <select class="ql-color">
          <option value="#FFFFFF"></option>
          <option value="#343440"></option>
          <option value="#1855D1"></option>
          <option value="#F44747"></option>
          <option value="#16D2AA"></option>
          <option value="#FEDF85"></option>
        </select>
        <select class="ql-background" id="select">
          <option value="#FFFFFF"></option>
          <option value="#343440"></option>
          <option value="#1855D1"></option>
          <option value="#F44747"></option>
          <option value="#16D2AA"></option>
          <option value="#FEDF85"></option>
        </select>
        </div>
        </div>
        
        </div>
    </div>
    <div id="editor"></div>
</body>
<script src="https://cdn.quilljs.com/1.0.0/quill.js"></script>
<script>
    var quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Type or paste something...',
        modules: {
            toolbar: '#toolbar'
        }
    });
</script>
</html>
`;

export const quill = {
    html,
};

// export class QuillManager {
//     private webView: React.RefObject<WebView<{}>>;
//
//     constructor(webView?: React.RefObject<WebView<{}>>) {
//         if (webView) {
//             this.webView = webView;
//         }
//     }
//
//     addText = (text: string): void => {
//         this.webView.current?.injectJavaScript(`addText('${text}');`);
//     };
//
//     setBold = (): void => {
//         this.webView.current?.injectJavaScript('quill.formate("bold", true);');
//     };
//
//     setItalic = (): void => {
//         this.webView.current?.injectJavaScript('quill.formate("italic", true);');
//     };
// }
