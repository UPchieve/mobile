import React, { createRef, useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

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

const session = '61ca106910a97c0022aaa816';
const getSessionRoom = (): string => `sessions-${session}`;

export const DocEditorScreen = () => {
  const _editor = createRef<QuillEditor>();
  const [socket] = useState(io(config.webSocketUrl, {
    reconnectionDelayMax: 5000,
  }));

  const handleQuillEditorEvents = () => {

    _editor.current?.on('text-change', ({ delta, _, source }: any) => {
      if (source === 'user') {
        console.log('emiting');
        socket.emit('transmitQuillDelta', {
          sessionId: session,
          delta,
        });
      }
    });

    _editor.current?.on('selection-change', (data: SelectionChangeData) => {
      if (data.source === 'user') {
        socket.emit('transmitQuillSelection', {
          sessionId: session,
          range: data.range,
        })
      }
    })

  };

  const addSocketListeners = () => {
    socket.on('quillState', ({ delta }: any) => {
      _editor.current?.setContents(delta);
    });

    socket.on('partnerQuillDelta', ({ delta }: any) => {
      _editor.current?.updateContents(delta);
    });

    socket.on('quillPartnerSelection', ({ range }: any) => {
      console.log('range changed', range);
      _editor.current?.setSelection(range.index, range.length);
    })

  }

  useEffect(() => {
    (async () => {
      console.log('Fetching the user information');
      const { user } = await authService.login();
      socket.connect();
      console.log('Trying to connect to to the socket server');
      socket.on('connect_error', (error: any) => {
        console.log('connection error', error);
      });
      socket.on('connect', () => {
        console.log('connected');

        addSocketListeners();

        socket.on('error', (error: any) => {
          console.log('Error!', error);
        });
        socket.on('redirect', (e: any) => {
          console.log('Redirect event happened', e);
        });

        //RequestQuillState
        socket.emit('requestQuillState', {
          sessionId: session,
        });

        socket.emit(
          'join',
          {
            sessionId: session,
            user,
            joinedFrom: '',
          }
        )

        console.log('method_ends');
      });
    })();
  }, [socket]);

  useEffect(() => {
    handleQuillEditorEvents();
  }, [_editor]);

  useEffect(() => {
    socket?.disconnect();
  }, []);

  const customStyles = {
    toolbar: {
      provider: (provided: any) => ({
        ...provided,
        borderTopWidth: 0,
      }),
      root: (provided: any) => ({
        ...provided,
        backgroundColor: 'white',
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
          modules: {
            toolbar: [
              [
                { header: [1, 2, false] },
                { list: 'ordered' },
                { list: 'bullet' },
              ],
            ],
          },
          placeholder: 'Type or paste something...',
          theme: 'snow',
        }}
      />
      <QuillToolbar
        editor={_editor}
        options={[
          ['bold', 'italic', 'underline', 'strike'],
          [
            { color: ['#000000', 'white', 'blue', 'red', 'green', 'yellow'] },
            {
              background: [
                '#000000',
                'white',
                'blue',
                'red',
                'green',
                'yellow',
              ],
            },
          ],
        ]}
        theme={'light'}
        styles={customStyles}
      />
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
});
