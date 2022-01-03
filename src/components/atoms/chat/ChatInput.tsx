import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { SvgIcons } from '../../../../assets/IndexIcons'

type InputType = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
    onPress: (value: string) => void
}

export const ChatInput: React.FC<InputType> = ({ value, setValue, onPress }) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder='Type a message...'
                placeholderTextColor={Colors.disabledGray}
            />
            <TouchableOpacity onPress={() => onPress(value)}>
                <SvgIcons.MessageIcon />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#D8DEE5',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 4,
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        color: Colors.softBlack,
        fontSize: 16,
        flexGrow: 1,
    }
});
