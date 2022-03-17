import React, { useState } from "react"
import { StyleSheet, TextInput } from "react-native"
import ModalSelector from 'react-native-modal-selector'
import { Colors } from "../../../../assets/Colors";
import { FontIndex } from "../../../../assets/FontIndex";

export const pickerDataParse = (original: string[]): dataType[] => original.map((v, i) => ({ key: i, label: v, }));

type dataType = {
    key: number,
    label: string,
}

type PickerType = {
    data: dataType[];
    // initialValue?: string,
    placeholder?: string;
    onChange?: (value: dataType) => void;
}

export const Picker: React.FC<PickerType> = ({ data, placeholder = 'Choose an option', onChange = () => { } }) => {
    const [internalState, setInternalState] = useState<string | undefined>(undefined);
    return <ModalSelector
        data={data}
        // initValue="Select something yummy!"
        accessible={true}
        scrollViewAccessibilityLabel={'Scrollable options'}
        cancelButtonAccessibilityLabel={'Cancel Button'}
        onChange={(value) => {
            setInternalState(value.label);
            onChange(value);
        }}>

        <TextInput
            style={[styles.input, internalState !== undefined && styles.inputSelected]}
            editable={false}
            placeholder={placeholder}
            placeholderTextColor={Colors.defaultGray}
            value={internalState} />
    </ModalSelector>
}

const styles = StyleSheet.create({
    input: {
        fontSize: 14,
        fontFamily: FontIndex.WorkSans.Regular,
        height: 40,
        borderColor: Colors.borderGray,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 15,
    },
    inputSelected: {
        borderColor: Colors.success
    }
});