import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, ViewToken, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Image } from 'react-native'
import { Colors } from '../../assets/Colors';
import { config } from '../../config';
import { ChatMessage } from '../components/atoms/chat/ChatMessage';
import { messageUserType } from '../components/atoms/chat/ChatTypes';
import { ChatInput } from '../components/atoms/chat/ChatInput';
//@ts-ignore
import { authService } from '../services/authService';
import { ChatIncomingData, ChatoutcomingData } from '../interfaces/chatInterfaces';
import { ChatItem, chatReducer } from '../reducers/chatReducer';
import { Session, SessionType, SessionUser } from '../interfaces/sessionInterfaces';
import { sessionService } from '../services/sessionService';
import { ChatTypping } from '../components/atoms/chat/ChatTypping';
import { ChatNewerChatButton } from '../components/atoms/chat/ChatNewerChatsButton';
import { ImageIndex } from '../../assets/ImageIndex';
import { User } from '../models/user';
import { AuthContext } from '../providers/AuthProvider';
import { delay } from '../utils/utils';


// type Props = NativeStackScreenProps<MainStackParamList, 'Chat'>;
type Props = {
    onSwitchPress: () => void;
    sessionType: SessionType,
}

const botMessages = [
    'Hey {0}! I’m the UPchieve Bot.',
    'Right now, we’re searching for a live coach to pair you with. This process should take 5-10 minutes, so please be patient!',
    'What kind of help do you need today?',
];

export const ChatScreen: React.FC<Props> = ({ onSwitchPress, sessionType }) => {

    const chatListRef = useRef<FlatList<ChatItem>>(null);
    const [chatMessage, setChatMessage] = useState<string>('');
    const [chat, dispatch] = useReducer(chatReducer, []);
    const [isTypping, setIsTypping] = useState<boolean>(false);
    const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);
    const [chatBotIsTyping, setChatbotIsTyping] = useState<boolean>(false);

    const { socketHandler, user, currentSession, sessionState } = useContext(AuthContext);

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
    }, []);

    const getPartner = (): User => {
        return (user._id !== sessionState?.volunteer?._id)
            ? sessionState!.student
            : sessionState!.volunteer;
    }

    const addSocketEventListeners = () => {
        socketHandler.on('messageSend', (data: ChatIncomingData) => {
            if (data.user !== user._id) {
                dispatch({
                    type: 'chat_incoming',
                    payload: { ...data, seen: false },
                });
            }
        });

        socketHandler.on('is-typing', () => {
            setIsTypping(true);
        });

        socketHandler.on('not-typing', () => {
            setIsTypping(false);
        });
    }

    const scrollToEnd = () => {
        chatListRef.current?.scrollToEnd();
        setShouldAutoScroll(true);
    }

    useEffect(() => {
        addSocketEventListeners();
        if (currentSession) {
            handleSessionMessages();
        }
    }, []);

    useEffect(() => {
        if (shouldAutoScroll) {
            setTimeout(() => {
                chatListRef.current?.scrollToEnd();
            }, 300);
        }
    }, [chat]);

    const onChatPress = (message: string) => {
        socketHandler.emit('message', {
            sessionId: sessionState?._id,
            user: user,
            message
        });
        console.log('message emitted');
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

    const onStartTyping = () => {
        // sessionId: this.currentSession._id
        socketHandler.emit('typing', {
            sessionId: currentSession?.sessionId
        });
    }

    const onEndTyping = () => {
        socketHandler.emit('notTyping', {
            sessionId: currentSession?.sessionId
        })
    }


    const handleSessionMessages = async () => {
        if (!sessionState?.volunteer) {
            for (const msg of botMessages) {
                try {
                    setChatbotIsTyping(true);
                    await delay(2000);
                    dispatch({
                        type: 'chat_incoming',
                        payload: {
                            contents: msg.replace('{0}', user.firstname),
                            createdAt: new Date().toISOString(),
                            isVolunteer: false,
                            user: 'chatbot',
                            seen: true,
                        }
                    });
                } catch { }
                finally {
                    setChatbotIsTyping(false);
                    await delay(1000);
                }
            }
            return;
        }
        const messages: (ChatIncomingData | ChatoutcomingData)[] = [];
        currentSession!.data.messages.forEach((message) => {
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


    const renderChatElement = ({ item }: any) => {
        let userType: messageUserType;
        if (item.user === 'chatbot') {
            userType = 'chatbot';
        } else {
            userType = item.isVolunteer ? 'volunteer' : 'student';
        }
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
        <View style={{ flex: 1 }}>
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
                    {chatBotIsTyping ? <ChatTypping userType='chatbot' /> : null}
                    {isTypping ? <ChatTypping userType={getPartner()?.isVolunteer ? 'volunteer' : 'student'} /> : null}
                </View>
                <View style={styles.inputWrapper}>
                    <ChatInput value={chatMessage} setValue={setChatMessage} onPress={onChatPress} onStartTyping={onStartTyping} onEndTyping={onEndTyping} />
                </View>
                <TouchableOpacity style={styles.swapIcon} onPress={onSwitchPress}>
                    <Image source={sessionType === 'WHITEBOARD' ? ImageIndex.icons.whiteBoard : ImageIndex.icons.chatEditor} width={42} height={40} />
                </TouchableOpacity>
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

// TODO add the message when the volunteer enter to the room