import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, Text, ViewToken, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
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
import { ChatTypping } from '../components/atoms/chat/ChatTypping';
import { ChatNewerChatButton } from '../components/atoms/chat/ChatNewerChatsButton';

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
interface Partner {
    _id: string;
    firstname: string;
    isVolunteer: boolean;
    type: string;
}
const session = '61d59c5210a97c0022aaf112';
export const ChatScreen = () => {
    const chatListRef = useRef<FlatList<ChatItem>>(null);
    const [chatMessage, setChatMessage] = useState<string>('');
    const [chat, dispatch] = useReducer(chatReducer, exampleChats);
    const [user, setUser] = useState<any>({});
    const [currentSession, setCurrentSession] = useState<Session>();
    const [partner, setPartner] = useState<Partner>();
    const [isTypping, setIsTypping] = useState<boolean>(false);
    const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(false);
    const [socket] = useState(io(config.webSocketUrl, {
        reconnectionDelayMax: 5000,
    }));
    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => {
        const currentState = chatListRef.current?.props.data;
        const max = viewableItems[viewableItems.length - 1];
        dispatch({
            type: 'chat_mark_seen',
            payload: {
                chatItem: currentState![max.index!],
            }
        });

    }, []);

    const addSocketEventListeners = (user: any) => {
        socket.on('messageSend', (data: ChatIncomingData) => {
            if (data.user !== user._id) {
                dispatch({
                    type: 'chat_incoming',
                    payload: { ...data, seen: false },
                });
            }
        });

        socket.on('is-typing', () => {
            setIsTypping(true);
        });

        socket.on('not-typing', () => {
            setIsTypping(false);
        });

    }

    const scrollToEnd = () => {
        chatListRef.current?.scrollToEnd();
        setShouldAutoScroll(true);
    }

    useEffect(() => {
        if (shouldAutoScroll) {
            chatListRef.current?.scrollToEnd();
        }
    }, [chat]);

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

    const handleSetSession = (session: Session) => {
        setCurrentSession(session);
        if (user._id === session.data.volunteer._id) {
            setPartner(session.data.student);
        } else {
            setPartner(session.data.volunteer);
        }
    }

    const onStartTyping = () => {
        // sessionId: this.currentSession._id
        console.log('start tiping.');
        socket.emit('typing', {
            sessionId: currentSession?.sessionId
        });
    }

    const onEndTyping = () => {
        socket.emit('notTyping', {
            sessionId: currentSession?.sessionId
        })
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
                });
            }
            scrollToEnd();
        });
    }

    useEffect(() => {
        (async () => {
            const { user } = await authService.login();
            const session = await sessionService.getCurrentSession();
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
                handleSetSession(session);
                handleSessionMessages(session, user._id);
            });
        })();
    }, [socket]);


    const renderChatElement = ({ item }: any) => {
        const userType: messageUserType = item.isVolunteer ? 'volunteer' : 'student';
        return <View style={{ marginTop: 15, width: '100%', alignItems: 'center' }}>
            <ChatMessage text={item.text} userType={userType} time={item.time} sentByMe={item.sentByMe} lastMessage={item.lastMessage} />
        </View>
    }

    const onScrollEndDrag = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log('handling the event');
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 60;
        const isClose = layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
        console.log('is close to bottom', isClose);
        setShouldAutoScroll(isClose);
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ paddingRight: 40, }}
                ref={chatListRef}
                data={chat}
                onViewableItemsChanged={_onViewableItemsChanged}
                onScrollEndDrag={onScrollEndDrag}
                renderItem={renderChatElement}
                keyExtractor={(item) => item.time.toISOString() + item.isVolunteer + item.lastMessage + item.sentByMe}
            />
            <ChatNewerChatButton newerChats={chat.filter(x => x.sentByMe === false && x.seen === false).length} onPress={() => scrollToEnd()} />
            <View style={{ height: 40, width: '100%' }}>
                {isTypping ? <ChatTypping userType={partner?.isVolunteer ? 'volunteer' : 'student'} /> : null}
            </View>
            <View style={styles.inputWrapper}>
                <ChatInput value={chatMessage} setValue={setChatMessage} onPress={onChatPress} onStartTyping={onStartTyping} onEndTyping={onEndTyping} />
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
        // paddingRight: 47,
    },
    inputWrapper: {
        marginTop: 16,
        marginRight: 40,
    }
});

// TODO Add the posibility to chat
// TODO add the message when the volunteer enter to the room
// TODO add the writing bubble