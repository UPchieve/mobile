import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { Colors } from '../../../../assets/Colors';
import { ImageIndex } from '../../../../assets/ImageIndex';
import { ChatBubble } from './ChatBubble';
import { messageUserType } from './ChatTypes';

type ChatTyppingType = {
    userType: messageUserType,
}

const formatTime = (date: Date) => date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true })

export const ChatTypping: React.FC<ChatTyppingType> = ({ userType, }) => {

    const renderAvatar = () => {
        switch (userType) {
            case 'student': return <Image source={ImageIndex.avatars.student} style={styles.icon} />
            case 'volunteer': return <Image source={ImageIndex.avatars.volunteer} style={styles.icon} />
            case 'chatbot': return <Image source={ImageIndex.avatars.chatbot} style={styles.icon} />
            default: throw Error();
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <ChatBubble sentByMe={false} text={''} userType={userType} isTypping={true} />
                {renderAvatar()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: 8 + 28,
        alignItems: 'flex-start',
    },
    icon: {
        height: 28,
        width: 28,
        position: 'absolute',
        bottom: 0,
        left: -8 - 28,
    },
    timeText: {
        fontSize: 14,
        color: Colors.secondaryGray,
        marginTop: 8,
    }
});
