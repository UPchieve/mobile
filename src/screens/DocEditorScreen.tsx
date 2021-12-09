import React, {createRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import { SafeAreaView } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

export const DocEditorScreen = () => {
  const _editor = createRef<QuillEditor>();

    const customStyles = {
        toolbar: {
            provider: (provided: any) => ({
                ...provided,
                borderTopWidth: 0,
            }),
            root: (provided: any) => ({
                ...provided,
                backgroundColor: 'white'
            }),
        },
    };

  return (
      <SafeAreaView style={styles.root}>
      {/*    <QuillToolbar editor={_editor} options={[*/}
      {/*    [{ 'header': [1, 2, false] }],*/}
      {/*    [{ 'list': 'ordered'}, { 'list': 'bullet' }],*/}
      {/*]} theme="light" />*/}
        <QuillEditor
            style={styles.editor}
            ref={_editor}
            quill={{
                modules:{
                    toolbar: [[
                        { 'header': [1, 2, false] },
                        { 'list': 'ordered'}, { 'list': 'bullet' }
                    ]],
                },
                placeholder: 'Type or paste something...',
                theme: 'snow'
            }}
        />
          <QuillToolbar editor={_editor} options={[
            ['bold', 'italic', 'underline', 'strike'],
            [
                { color: ['#000000', 'blue', 'red','green', 'yellow'] },
                { background: ['#000000', 'blue', 'red','green', 'yellow'] },
            ],
        ]} theme={'light'} styles={customStyles}/>
      </SafeAreaView>
  )
};


const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',

    },
    root: {
        flex: 1,
        marginTop: 0,
        backgroundColor: '#FFF'
    },
    editor: {
        flex: 1,
        padding: 0,
        width: Dimensions.get('window').width,
        borderWidth: 0,
        backgroundColor: 'white',
    },
})
