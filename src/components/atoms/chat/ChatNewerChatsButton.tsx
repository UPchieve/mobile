import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';
interface ChatNewerChatButtonType {
    newerChats?: number;
    onPress: () => void;
}
export const ChatNewerChatButton: React.FC<ChatNewerChatButtonType> = ({
    newerChats,
    onPress,
}) => {
    if (!newerChats) {
        return null;
    }
    return (
        <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
            <Text style={styles.text}>{newerChats} messages down</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    buttonWrapper: {
        backgroundColor: Colors.information,
        width: 160,
        height: 28,
        justifyContent: 'center',
        borderRadius: 14,
        alignSelf: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
});
