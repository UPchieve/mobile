import React, {useState} from "react";
import {Colors, PrimaryColorType} from "../../../assets/Colors";
import {StyleProp, StyleSheet, TextInput, ViewStyle} from "react-native";


interface ICommonButton {
    value?: string | undefined;
    onChangeText?: (arg: string) => void | undefined ;
    style?: StyleProp<ViewStyle>;
    placeholder?: string;
    borderColorSelected?: string;
}

export const CommonInput: React.FC<ICommonButton> = ({style, onChangeText, value, placeholder = '', borderColorSelected = Colors.success }) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
        setIsFocused(false)
    }

    const handleFocus = () => {
        setIsFocused(true);
    }
    return (
        <TextInput
            style={[styles.textInput, isFocused && {borderColor: borderColorSelected}, style, placeholder !== '' && styles.placeholder ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
        />

    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 148,
        borderWidth: 0.5,
        padding: 10,
        borderColor: Colors.borderGray,
        textAlignVertical: 'top',
    },
    textInputSelected: {
        borderColor: Colors.success
    },
    placeholder: {
        flexWrap: 'wrap',
    }
})
