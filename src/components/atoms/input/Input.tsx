import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { SvgIcons } from '../../../../assets/IndexIcons'

type InputType = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<InputType> = ({ value, setValue }) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} 
                value={value}
                onChangeText={setValue}
                placeholder='Type a message...'
                placeholderTextColor={Colors.disabledGray}
                />
            <SvgIcons.MessageIcon />
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
        color: Colors.disabledGray,
        fontSize: 16,
        flexGrow: 1,
    }
});
