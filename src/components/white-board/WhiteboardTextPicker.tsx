import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SvgIcons } from '../../../assets/IndexIcons';

export interface IZwibblerTextModal {
  visible: boolean;
  onModalClose?: (text?: string) => void;
}

export const WhiteboardTextPicker: React.FC<IZwibblerTextModal> = ({
  visible = false,
  onModalClose = () => {},
}) => {
  const [text, setText] = useState<string>('');

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.actionBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => onModalClose()}
            >
              <SvgIcons.CloseIcon width={16} height={16} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Add Text</Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'center' }}
            onPress={() => {
              onModalClose(text.split('\n').join(' '));
              setText('');
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#1855D1' }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textArea}
          multiline={true}
          autoFocus
          textAlignVertical="top"
          value={text}
          onChangeText={setText}
          placeholder="|Type here..."
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
  actionBar: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 18,
  },
  textArea: {
    textAlignVertical: 'top',
    flexGrow: 1,
    paddingHorizontal: 21,
    paddingTop: 20,
    fontSize: 16,
  },
});
