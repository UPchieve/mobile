import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../assets/Colors';
import { SvgIcons } from '../../assets/IndexIcons';
import { ChatMessage } from '../components/atoms/chat/ChatMessage';
import { messageUserType } from '../components/atoms/chat/ChatTypes';
import { Input } from '../components/atoms/input/Input';

export const ChatScreen = () => {
    const [chatMessage, setChatMessage] = useState<string>('');
    const [chats, setChats] = useState([
        {
            sentByMe: false,
            text: 'Right now, we’re searching for a live coach to pair you with. This process should take 5-10 minutes, so please be patient!',
            time: new Date(),
            userType: 'student',
            lastMessage: false,
        },
        {
            sentByMe: false,
            text: 'second message!',
            time: new Date(),
            userType: 'student',
            lastMessage: true,
    
        },
        {
            sentByMe: true,
            text: 'Right now, we’re searching for a live coach to pair you with. This process should take 5-10 minutes, so please be patient!',
            time: new Date(),
            userType: 'volunteer',
            lastMessage: true,
        }
    
    ]);

    const renderChatElement = ({ item }: any) => {
        return <View style={{ marginTop: 15, width: '100%', alignItems: 'center' }}>
            <ChatMessage text={item.text} userType={item.userType as messageUserType} time={item.time} sentByMe={item.sentByMe} lastMessage={item.lastMessage} />
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flexDirection: 'column-reverse', width: '100%', }}
                data={chats}
                renderItem={renderChatElement}
                keyExtractor={(item) => item.time.toISOString() + item.userType + item.lastMessage + item.sentByMe}
            />
            <View style={styles.inputWrapper}>
                <Input value={chatMessage} setValue={setChatMessage}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 47,
    },
    inputWrapper: {
        marginTop: 16,
    }
});

// TODO Add the posibility to chat
// TODO add the message when the volunteer enter to the room
// TODO add the writing bubble