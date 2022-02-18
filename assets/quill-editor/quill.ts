
const html = `
<html>
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<style>
    #editor{
        padding-bottom: 50px !important;
    }
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
        position: fixed;
        bottom: 0;
        z-index: 10000;
        height: 50px;
        background-color: 'aqua';
        width: 99%;
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
        /* height: 20px;
        width: 35px;
        color: #444; */
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

    .mb-2 {
    margin-bottom: 2px;
    }


    #toolbar>span:nth-child(1)>span>span.ql-picker-options {
        position: absolute;
        top: 25px;
        left: 0;
        z-index: 1;
    }

    .ql-color.ql-color-picker,
    .ql-background.ql-color-picker {
        height: 20px;
        width: 35px;
    }


    .ql-background.ql-color-picker>span.ql-picker-label,
    .ql-color.ql-color-picker>span.ql-picker-label {
        height: 28px !important;
        width: 35px !important;
    }

    .ql-cursor-flag {
        display: none;
    }

    /* color item */
    .ql-picker-item.ql-primary {
        height: 31px !important;
        width: 31px !important;
        border-radius: 100%;
    }

    .ql-picker-item.ql-primary[data-value="#FFFFFF"] {
        background-color: #F1F3F6 !important;
        border-color: #ABB2BD !important;
    }

    span.ql-color>span.ql-picker-options[aria-hidden="false"] {
        display: flex !important;
        justify-content: space-around;
        position: absolute !important;
        width: 259 !important;
        top: -50 !important;
        right: -70 !important;
    }

    span.ql-background>span.ql-picker-options[aria-hidden="false"] {
        display: flex !important;
        justify-content: space-around;
        position: absolute !important;
        width: 259 !important;
        top: -50 !important;
        right: -15 !important;
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
                    <button class="ql-italic mr-15"></button>
                    <button class="ql-underline mr-15"></button>
                    <button class="ql-strike mr-15"></button>
                </div>
                <div class="wrapper-background-box">
                    <span class="ql-formats mb-2">
                        <select class="ql-color">
                            <option value="#343440"></option>
                            <option value="#1855D1"></option>
                            <option value="#F44747"></option>
                            <option value="#16D2AA"></option>
                            <option value="#FEDF85"></option>
                        </select>
                    </span>
                    <span class="ql-formats mb-2">
                        <select class="ql-background">
                            <option value="white"></option>
                            <option value="#1855D1"></option>
                            <option value="#F44747"></option>
                            <option value="#16D2AA"></option>
                            <option value="#FEDF85"></option>
                        </select>
                    </span>
                </div>
            </div>

        </div>
    </div>
    <div id="editor"></div>
</body>
<script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/quill-cursors@3.1.0/dist/quill-cursors.min.js"></script>
<script>
    Quill.register('modules/cursors', QuillCursors);
    var quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Type or paste something...',
        modules: {
            cursors: {
                transformOnTextChange: true
            },
            toolbar: '#toolbar'
        }
    });

    const cursors = quill.getModule('cursors');

    cursors.createCursor('partnerCursor', 'Partner', 'red');

    quill.on('text-change', function (delta, oldDelta, source) {
        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: "text-change", eventValue: {delta, oldDelta, source}}));
    });

    quill.on('selection-change', function (range, oldRange, source) {
        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: "selection-change", eventValue: {range, source}}));
    });

    window.addEventListener('message', (e) => {
        const data = JSON.parse(e.data);
        if (data.eventType === 'setContents') {
            quill.setContents(data.eventValue);
        } else if (data.eventType === 'updateContents') {
            quill.updateContents(data.eventValue);
        } else if (data.eventType === 'setSelection') {
            cursors.moveCursor('partnerCursor', data.eventValue);
        } else if (data.eventType === 'hideToolbar') {
            const elements = document.querySelectorAll('.hiddeable');
            elements.forEach(x => {
                x.style.display = 'none';
            })
        } else if (data.eventType === 'showToolbar') {
            const elements = document.querySelectorAll('.hiddeable');
            elements.forEach(x => {
                x.style.display = 'inline-block';
            })
        } else if (data.eventType === 'blur') {
            document.activeElement && document.activeElement.blur();
        } else if (data.eventType === 'focus') {
            quill.focus();
        }
    });

</script>

</html>
`;

export const quill = {
    html,
};
