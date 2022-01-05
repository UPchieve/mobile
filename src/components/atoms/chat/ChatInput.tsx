import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { SvgIcons } from '../../../../assets/IndexIcons'

type InputType = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
    onPress: (value: string) => void
    onStartTyping: () => void
    onEndTyping: () => void
}

export const ChatInput: React.FC<InputType> = ({ value, setValue, onPress, onStartTyping, onEndTyping }) => {
    const [id, setId] = useState<any>();
    const [startTypingInformed, setStartTypingInformed] = useState(false);
    const onKeyPress = () => {
        if (!startTypingInformed) {
            onStartTyping();
            setStartTypingInformed(true);
        }
        clearTimeout(id);
        const timeId = setTimeout(() => {
            onEndTyping();
            setStartTypingInformed(false);
        }, 2000);
        setId(timeId);
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                value={value}
                multiline={true}
                numberOfLines={4}
                onChangeText={setValue}
                placeholder='Type a message...'
                onKeyPress={onKeyPress}
                placeholderTextColor={Colors.disabledGray}
            />
            <TouchableOpacity onPress={() => onPress(value)}>
                <SvgIcons.MessageIcon fill={value?.length > 0 ? Colors.success : undefined} />
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
        paddingTop: 7,
        paddingBottom: 7,
        paddingHorizontal: 16,
        color: Colors.softBlack,
        fontSize: 16,
        flexGrow: 1,
        // textAlignVertical: 'bottom',
        minHeight: 36,
        maxHeight: 105,
    }
});
