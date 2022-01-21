import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Colors } from "../../../../assets/Colors"
import { FontIndex } from "../../../../assets/FontIndex"
import { Separator } from "./Separator"
import Modal from 'react-native-modal'
import { randomString } from '../../../utils/utils'

type ModalBottomPickerType = {
    visible: boolean;
    dismiss: () => void;
    title: string;
    options: any[];
    getLabel?: (item: any) => string;
    onSelect?: (item: any) => void;
}
export const ModalBottomPicker: React.FC<ModalBottomPickerType> = ({ visible, dismiss, options, onSelect, title, getLabel = (x) => x }) => {

    const renderItem = (item: string) => {
        return <View key={item+randomString()}>
            <Separator backgroundColor={Colors.borderGray} />
            <TouchableOpacity style={{ paddingLeft: 20, marginVertical: 12, }} onPress={() => {
                onSelect && onSelect(item)
                dismiss();
            }}>
                <Text style={{ fontFamily: FontIndex.WorkSans.Regular, fontSize: 14, color: Colors.softBlack }}
                > {getLabel(item)}</Text >
            </TouchableOpacity>
        </View >
    }

    return <Modal isVisible={visible}
        backdropOpacity={.15}
        onBackdropPress={() => dismiss()}
        hasBackdrop={true}
        swipeDirection='down'
        swipeThreshold={200}
        onSwipeComplete={() => dismiss()}
        style={{
            justifyContent: "flex-end",
            margin: 0,
        }}>
        <SafeAreaView style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 15, borderTopRightRadius: 15,
        }}>
            <ScrollView style={{ paddingVertical: 15, }}>
                <Text style={{ marginBottom: 15, alignSelf: 'center', fontFamily: FontIndex.WorkSans.Medium, fontSize: 14 }}>{title}</Text>
                {options.map(x => renderItem(x))}
            </ScrollView>
        </SafeAreaView>
    </Modal>
}