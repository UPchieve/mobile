import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { messageUserType } from './ChatTypes';

type ChatBubbleType = {
    text: string;
    sentByMe: boolean;
    userType: messageUserType,
}



export const ChatBubble: React.FC<ChatBubbleType> = ({ text, sentByMe, userType }) => {

    const getBackgroundColor = () => {
        if (sentByMe) {
            return Colors.backgroundBlue;
        } else {
            return userType === 'chatbot' ? Colors.backgroundGreen : Colors.backgroundGray;
        }
    }

    return <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
        <Text style={styles.text}>{text}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: 245,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
    },
    text: {
        color: Colors.softBlack,
        fontSize: 16,
    }
});