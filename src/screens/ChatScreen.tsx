import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, Text, ViewToken, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Image, KeyboardAvoidingView } from 'react-native'
import { Colors } from '../../assets/Colors';
import { config } from '../../config';
import { ChatMessage } from '../components/atoms/chat/ChatMessage';
import { messageUserType } from '../components/atoms/chat/ChatTypes';
import { ChatInput } from '../components/atoms/chat/ChatInput';
//@ts-ignore
import io from 'socket.io-client'
import { authService } from '../services/authService';
import { ChatIncomingData, ChatoutcomingData } from '../interfaces/chatInterfaces';
import { ChatItem, chatReducer } from '../reducers/chatReducer';
import { Session } from '../interfaces/sessionInterfaces';
import { sessionService } from '../services/sessionService';
import { ChatTypping } from '../components/atoms/chat/ChatTypping';
import { ChatNewerChatButton } from '../components/atoms/chat/ChatNewerChatsButton';
import { ImageIndex } from '../../assets/ImageIndex';
import { User } from '../models/user';
import { CommonKeyboardAvoidingView } from '../components/common/CommonKeyboardAvoidingView';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { MainStackParamList } from '../routes/MainStackNavigator';

let chatt = [];
const auxiliaryType = (session?: Session): 'DOCUMENT' | 'WHITEBOARD' => {
    const documentEditorSubTopics = [
        'planning',
        'essays',
        'applications',
        'satReading',
        'humanitiesEssays'
    ]
    if (session && documentEditorSubTopics.includes(session.data.subTopic))
        return 'DOCUMENT'
    else return 'WHITEBOARD'
}
interface Partner {
    _id: string;
    firstname: string;
    isVolunteer: boolean;
    type: string;
}
type Props = NativeStackScreenProps<MainStackParamList, 'Chat'>;
export const ChatScreen: React.FC<Props> = ({ route }) => {
    const { sessionId } = route.params;
    console.log(sessionId);

    const chatListRef = useRef<FlatList<ChatItem>>(null);
    const [chatMessage, setChatMessage] = useState<string>('');
    const [chat, dispatch] = useReducer(chatReducer, []);
    const [user, setUser] = useState<any>({});
    const [currentSession, setCurrentSession] = useState<Session>();
    const [partner, setPartner] = useState<Partner>();
    const [isTypping, setIsTypping] = useState<boolean>(false);
    const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);
    const [socket] = useState(io(config.webSocketUrl, {
        reconnectionDelayMax: 5000,
    }));



    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => {

        const currentState = chatListRef.current?.props.data;
        const max = viewableItems[viewableItems.length - 1];
        if (!currentState![max.index!].seen) {
            dispatch({
                type: 'chat_mark_seen',
                payload: {
                    chatItem: currentState![max.index!],
                }
            });
        }
        // const currentState = chatListRef.current?.props.data;
        // if (currentState) {
        //     const max = viewableItems[viewableItems.length - 1];
        //     if (max?.index && currentState[max.index].seen) {
        //         dispatch({
        //             type: 'chat_mark_seen',
        //             payload: {
        //                 chatItem: currentState[max.index],
        //             }
        //         });
        //     }
        // }

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
        console.log('state updated.');
        console.log('efecto', chat.length);
        chatt = chat;
        if (shouldAutoScroll) {
            console.log('scrolling. ');
            setTimeout(() => {
                chatListRef.current?.scrollToEnd();
            }, 300);
        }
    }, [chat]);

    const onChatPress = (message: string) => {
        console.log('on chatting', user._id)
        socket.emit('message', {
            sessionId: sessionId,
            user: user,
            message
        });
        dispatch({
            type: 'chat_outcoming',
            payload: {
                user: user._id,
                contents: message,
                isVolunteer: user.isVolunteer,
                createdAt: new Date().toISOString(),
            }
        });
        setChatMessage('');
    }

    const handleSetSession = (session: Session, user_id: string) => {
        setCurrentSession(session);
        if (user_id === session.data.volunteer._id) {
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

    const handleSessionMessages = (session: Session, user: User,) => {
        const messages: (ChatIncomingData | ChatoutcomingData)[] = [];
        session.data.messages.forEach((message) => {
            if (message.user === user._id) {
                messages.push({
                    contents: message.contents,
                    isVolunteer: user.isVolunteer,
                    user: message.user,
                    createdAt: message.createdAt,
                });
            } else {
                messages.push({
                    contents: message.contents,
                    isVolunteer: !user.isVolunteer,
                    createdAt: message.createdAt,
                    user: message.user,
                })
            }
        });
        dispatch({
            type: "chat_session_open",
            payload: {
                userId: user._id,
                messages: messages,
            }
        });
    }

    useEffect(() => {
        (async () => {
            const { user } = await authService.login();
            setUser(user);
            try {
                const currentSession = await sessionService.getCurrentSession();
                handleSetSession(currentSession, user._id);
                handleSessionMessages(currentSession, user);
            } catch{}
            if (socket.connected) {
                socket.disconnect();
            }
            socket.connect();
            socket.on('connect', async () => {
                console.log('Socket connected.')
                //subscribing to events
                addSocketEventListeners(user);
                socket.emit(
                    'join',
                    {
                        sessionId: sessionId,
                        user,
                        joinedFrom: '',
                    }
                );
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
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 60;
        const isClose = layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
        setShouldAutoScroll(isClose);
    }

    return (
        <CommonKeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    style={{ paddingRight: 40, }}
                    ref={chatListRef}
                    data={chat}
                    onViewableItemsChanged={_onViewableItemsChanged}
                    onScrollEndDrag={onScrollEndDrag}
                    renderItem={renderChatElement}
                    keyExtractor={(item) => item.time.toISOString() + item.isVolunteer + item.lastMessage + item.sentByMe}
                bounces={false}
                />
                <ChatNewerChatButton newerChats={chat.filter(x => x.sentByMe === false && x.seen === false).length} onPress={() => scrollToEnd()} />
                <View style={{ height: 40, width: '100%' }}>
                    {isTypping ? <ChatTypping userType={partner?.isVolunteer ? 'volunteer' : 'student'} /> : null}
                </View>
                <View style={styles.inputWrapper}>
                    <ChatInput value={chatMessage} setValue={setChatMessage} onPress={onChatPress} onStartTyping={onStartTyping} onEndTyping={onEndTyping} />
                </View>
                <TouchableOpacity style={styles.swapIcon}>
                    <Image source={auxiliaryType(currentSession) === 'WHITEBOARD' ? ImageIndex.icons.whiteBoard : ImageIndex.icons.chatEditor} width={42} height={40} />
                </TouchableOpacity>
            </View>
        </CommonKeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 30,
    },
    inputWrapper: {
        marginTop: 16,
        marginRight: 40,
    },
    swapIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
});

// TODO Add the posibility to chat
// TODO add the message when the volunteer enter to the room
// TODO add the writing bubble
