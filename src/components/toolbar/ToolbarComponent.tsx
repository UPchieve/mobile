import React from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { ImageIndex } from '../../../assets/ImageIndex'

const WIDTH = Dimensions.get('window').width

// interface ToolbarItems {
//     id: number;
//     name: string;
//     icon: Image;
//     iconAdditionalProps?: any;
//     handler: () => void;
//     subMenu?: ToolbarItems[];
// }
//
// interface ToolbarProps {
//     editorManager: QuillManager,
//     selectedToolName: QuillTypes;
// }

export const ToolbarComponent = () => {
  // const tools: ToolbarItems[] = [
  //     {
  //         id: 1,
  //         name: 'bold',
  //         icon: boldIcon,
  //         handler: () => {
  //             editorManager.setBold()
  //         },
  //     },
  //     {
  //         id: 2,
  //         name: 'italic',
  //         icon: italicIcon,
  //         handler: () => {
  //             editorManager.setItalic();
  //         },
  //     },
  // ]

  return (
    <SafeAreaView>
      <View style={styles.toolbar}>
        <View style={styles.wrapperToolbar}>
          <TouchableOpacity>
            <Image source={{ uri: ImageIndex.icons.toolbar.boldIcon }} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperToolbar}>
          <TouchableOpacity>
            <Image source={{ uri: ImageIndex.icons.toolbar.italicIcon }} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperToolbar}>
          <TouchableOpacity>
            <Image source={{ uri: ImageIndex.icons.toolbar.underlineIcon }} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperToolbar}>
          <TouchableOpacity>
            <Image source={{ uri: ImageIndex.icons.toolbar.strikeIcon }} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperToolbar}>
          {/*<TouchableOpacity>*/}
          {/*    <Image source={{uri: ImageIndex.icons.toolbar.bIcon}}/>*/}
          {/*</TouchableOpacity>*/}
        </View>
        <View style={styles.wrapperToolbar}>
          <TouchableOpacity>
            <Image source={{ uri: ImageIndex.icons.toolbar.colorIcon }} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperToolbar}>
          <TouchableOpacity>
            <Image source={{ uri: ImageIndex.icons.toolbar.backgroundIcon }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#E5E5E5',
  },
  wrapperToolbar: {
    paddingHorizontal: 17,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
