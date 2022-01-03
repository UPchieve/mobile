import React, {RefObject, useEffect} from "react";
import {Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import QuillEditor from "react-native-cn-quill";
import {ZwibblerManager} from "../../../assets/zwibbler/zwibbler";
import {ZwibblerTool} from "../../types/zwibblerTypes";
import {QuillTypes} from "../../types/quillTypes";
import {SvgIcons} from "../../../assets/IndexIcons";
import {SvgFC} from "../../../assets/icons/SvgInterface";

const WIDTH = Dimensions.get('window').width;

const boldIcon = require('../../../assets/icons/toolbar/bold.png');
const italicIcon = require('../../../assets/icons/toolbar/italic.png');
const underlineIcon = require('../../../assets/icons/toolbar/underline.png');
const strikeIcon = require('../../../assets/icons/toolbar/strike.png');
const colorIcon = require('../../../assets/icons/toolbar/color.png');
const backgroundIcon = require('../../../assets/icons/toolbar/background.png');

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
                            <Image source={boldIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapperToolbar}>
                        <TouchableOpacity>
                            <Image source={italicIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapperToolbar}>
                        <TouchableOpacity>
                            <Image source={underlineIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapperToolbar}>
                        <TouchableOpacity>
                            <Image source={strikeIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapperToolbar}>
                        {/*<TouchableOpacity>*/}
                        {/*    <Image source={bIcon}/>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View style={styles.wrapperToolbar}>
                        <TouchableOpacity>
                            <Image source={colorIcon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapperToolbar}>
                        <TouchableOpacity>
                            <Image source={backgroundIcon}/>
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
    }
})
