import React, { useEffect, useReducer, useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Colors } from '../../assets/Colors';
import { SvgIcons } from '../../assets/IndexIcons';
import { config } from '../../config';
import { ChatMessage } from '../components/atoms/chat/ChatMessage';
import { messageUserType } from '../components/atoms/chat/ChatTypes';
import { ChatInput } from '../components/atoms/chat/ChatInput';
//@ts-ignore
import io from 'socket.io-client'
import { authService } from '../services/authService';
import { ChatIncomingData } from '../interfaces/chatInterfaces';
import { ChatItem, chatReducer } from '../reducers/chatReducer';
import { Session } from '../interfaces/sessionInterfaces';
import { sessionService } from '../services/sessionService';

const exampleChats: ChatItem[] = [
    {
        sentByMe: false,
        text: 'Right now, we’re searching for a live coach to pair you with. This process should take 5-10 minutes, so please be patient!',
        time: new Date(),
        // userType: 'student',
        isVolunteer: false,
        lastMessage: false,
    },
    {
        sentByMe: false,
        text: 'second message!',
        time: new Date(),
        isVolunteer: false,
        lastMessage: true,

    },
    {
        sentByMe: true,
        text: 'Right now, we’re searching for a live coach to pair you with. This process should take 5-10 minutes, so please be patient!',
        time: new Date(),
        isVolunteer: true,
        lastMessage: true,
    }

]
const session = '61d312cb10a97c0022aab017';
export const ChatScreen = () => {
    const [chatMessage, setChatMessage] = useState<string>('');
    const [chat, dispatch] = useReducer(chatReducer, exampleChats);
    const [user, setUser] = useState<any>({});
    const [currentSession, setCurrentSession] = useState<Session>();

    const [socket] = useState(io(config.webSocketUrl, {
        reconnectionDelayMax: 5000,
    }));

    const addSocketEventListeners = (user: any) => {
        socket.on('messageSend', (data: ChatIncomingData) => {
            if (data.user !== user._id) {
                console.log('they are not equals')
                dispatch({
                    type: 'chat_incoming',
                    payload: data,
                })
            }
        });
    }

    const onChatPress = (message: string) => {
        console.log('on chatting', user._id)
        socket.emit('message', {
            sessionId: session,
            user: user,
            message
        });
        dispatch({
            type: 'chat_outcoming',
            payload: {
                user: user._id,
                contents: message,
                isVolunteer: user.isVolunteer,
            }
        });
        setChatMessage('');
    }

    const handleSessionMessages = (session: Session, user_id: string,) => {
        session.data.messages.forEach((message) => {
            if (message.user === user_id) {
                dispatch({
                    type: 'chat_outcoming',
                    payload: {
                        contents: message.contents,
                        isVolunteer: user.isVolunteer,
                        user: message.user,
                    }
                })
            } else {
                dispatch({
                    type: 'chat_incoming',
                    payload: {
                        contents: message.contents,
                        isVolunteer: !user.isVolunteer,
                        createdAt: message.createdAt,
                        user: message.user,
                    }
                })

            }
        });
    }

    useEffect(() => {
        (async () => {
            const { user } = await authService.login();
            const session = await sessionService.getCurrentSession();
            console.log(session);
            handleSessionMessages(session, user._id);
            setUser(user);
            if (socket.connected) {
                socket.disconnect();
            }
            socket.connect();
            socket.on('connect', () => {
                console.log('Socket connected.')
                //subscribing to events
                addSocketEventListeners(user);
                socket.emit(
                    'join',
                    {
                        sessionId: session,
                        user,
                        joinedFrom: '',
                    }
                )
            });
        })();
    }, [socket]);


    const renderChatElement = ({ item }: any) => {
        const userType: messageUserType = item.isVolunteer ? 'volunteer' : 'student';
        return <View style={{ marginTop: 15, width: '100%', alignItems: 'center' }}>
            <ChatMessage text={item.text} userType={userType} time={item.time} sentByMe={item.sentByMe} lastMessage={item.lastMessage} />
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                // contentContainerStyle={{ flexDirection: 'column-reverse', width: '100%', }}
                // contentContainerStyle={{flexGrow: 1,}}
                data={chat}
                renderItem={renderChatElement}
                keyExtractor={(item) => item.time.toISOString() + item.isVolunteer + item.lastMessage + item.sentByMe}
            />
            <View style={styles.inputWrapper}>
                <ChatInput value={chatMessage} setValue={setChatMessage} onPress={onChatPress} />
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