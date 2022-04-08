import React, {
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ViewToken,
    TouchableOpacity,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Image,
    Text,
    SafeAreaView,
    Platform,
} from 'react-native';
import { Colors } from '../../assets/Colors';
import { ChatMessage } from '../components/atoms/chat/ChatMessage';
import { messageUserType } from '../components/atoms/chat/ChatTypes';
import { ChatInput } from '../components/atoms/chat/ChatInput';
//@ts-ignore
import {
    ChatIncomingData,
    ChatoutcomingData,
} from '../interfaces/chatInterfaces';
import {
    chatReducer,
    ChatReducerAction,
    ChatType,
} from '../reducers/chatReducer';
import { SessionType } from '../interfaces/sessionInterfaces';
import { ChatTypping } from '../components/atoms/chat/ChatTypping';
import { ChatNewerChatButton } from '../components/atoms/chat/ChatNewerChatsButton';
import { ImageIndex } from '../../assets/ImageIndex';
import { User } from '../models/user';
import { AuthContext } from '../providers/AuthProvider';
import { delay } from '../utils/utils';
import { FontIndex } from '../../assets/FontIndex';
import { usePrevious } from '../hooks/usePrevious';
import { useKeyboard } from '@react-native-community/hooks';
import { inlineStyles } from 'react-native-svg';
import {lockAsync} from "expo-screen-orientation";
import {useOrientation} from "../hooks/useOrientation";

// type Props = NativeStackScreenProps<MainStackParamList, 'Chat'>;
type Props = {
    onSwitchPress: () => void;
    sessionType: SessionType;
    chat: ChatType[];
    dispatch: React.Dispatch<ChatReducerAction>;
};

const botMessages = [
    'Hey {0}! I’m the UPchieve Bot.',
    'Right now, we’re searching for a live coach to pair you with. This process should take 5-10 minutes, so please be patient!',
    'What kind of help do you need today?',
];

export const ChatScreen: React.FC<Props> = ({
    onSwitchPress,
    sessionType,
    chat,
    dispatch,
}) => {
    const chatListRef = useRef<FlatList<ChatType>>(null);
    const [chatMessage, setChatMessage] = useState<string>('');
    const [isTypping, setIsTypping] = useState<boolean>(false);
    const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);
    const [chatBotIsTyping, setChatbotIsTyping] = useState<boolean>(false);
    const [isReady, setIsReady] = useState(false);

    const context = useContext(AuthContext);
    const { socketHandler, sessionState } = context;
    const user = context.user!;
    const { keyboardShown } = useKeyboard();

    const {lockAsync} = useOrientation();

    const [inputSize, setInputSize] = useState<number>();

    const previousSessionState = usePrevious(sessionState);

    const _onViewableItemsChanged = useCallback(
        ({
            viewableItems,
            changed,
        }: {
            viewableItems: ViewToken[];
            changed: ViewToken[];
        }) => {
            const currentState = chatListRef.current?.props.data;

            if (viewableItems.length === 0) {
                return;
            }

            const max = viewableItems[viewableItems.length - 1];
            //@ts-ignore
            if (!currentState![max.index!].seen) {
                if (currentState![max.index!].type === 'message') {
                    dispatch({
                        type: 'chat_mark_seen',
                        payload: {
                            chatItem: currentState![max.index!],
                        },
                    });
                }
            }
        },
        []
    );

    const getPartner = (): User | null => {
        return user._id === sessionState?.volunteer?._id
            ? sessionState!.student
            : sessionState!.volunteer!;
    };

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
    };

    const scrollToEnd = () => {
        chatListRef.current?.scrollToEnd();
        setShouldAutoScroll(true);
    };

    useEffect(() => {
        if (Platform.OS === 'ios' && Platform.isPad) {
            lockAsync('LANDSCAPE');
        }
        addSocketEventListeners();
    }, []);


    useEffect(() => {
        if (!isReady) {
            if (sessionState && !sessionState.endedAt) {
                handleSessionMessages();
                setIsReady(true);
            }
        }
    }, [sessionState]);

    useEffect(() => {
        if (sessionState && previousSessionState) {
            if (
                !!sessionState.volunteerJoinedAt &&
                !previousSessionState.volunteerJoinedAt
            ) {
                if (user.isVolunteer === false) {
                    dispatch({
                        type: 'chat_add_text',
                        payload: 'A volunteer has entered the chat room',
                    });
                }
            } else if (sessionState?.endedBy === sessionState.student._id) {
                if (user.isVolunteer === true) {
                    dispatch({
                        type: 'chat_add_text',
                        payload: 'Student has left the chat room',
                    });
                }
            }
        }
    }, [sessionState]);

    useEffect(() => {
        if (shouldAutoScroll) {
            setTimeout(() => {
                chatListRef.current?.scrollToEnd();
            }, 300);
        }
    }, [chat]);

    useEffect(() => {
        if (keyboardShown) {
            chatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [keyboardShown]);

    const onChatPress = (message: string) => {
        socketHandler.emit('message', {
            sessionId: sessionState?._id,
            user: user,
            message,
        });
        dispatch({
            type: 'chat_outcoming',
            payload: {
                user: user._id,
                contents: message,
                isVolunteer: user.isVolunteer,
                createdAt: new Date().toISOString(),
            },
        });
        setChatMessage('');
    };

    const onStartTyping = () => {
        socketHandler.emit('typing', {
            sessionId: sessionState?._id,
        });
    };

    const onEndTyping = () => {
        socketHandler.emit('notTyping', {
            sessionId: sessionState?._id,
        });
    };

    const handleSessionMessages = async () => {
        if (!sessionState?.volunteer && user.isVolunteer === false) {
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
                        },
                    });
                } catch {
                } finally {
                    setChatbotIsTyping(false);
                    await delay(1000);
                }
            }
            return;
        }

        const messages: (ChatIncomingData | ChatoutcomingData)[] = [];
        sessionState!.messages.forEach((message) => {
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
                });
            }
        });
        dispatch({
            type: 'chat_session_open',
            payload: {
                userId: user._id,
                messages: messages,
            },
        });
    };

    const renderChatElement = ({ item }: { item: ChatType }) => {
        if (item.type === 'message') {
            let userType: messageUserType;
            if (item.user === 'chatbot') {
                userType = 'chatbot';
            } else {
                userType = item.isVolunteer ? 'volunteer' : 'student';
            }
            return (
                <View
                    style={{
                        marginTop: 15,
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <ChatMessage
                        text={item.text}
                        userType={userType}
                        time={item.time}
                        sentByMe={item.sentByMe}
                        lastMessage={item.lastMessage}
                    />
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        marginTop: 15,
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.chatTextInfo}>{item.text}</Text>
                </View>
            );
        }
    };

    const onScrollEndDrag = ({
        nativeEvent,
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 60;
        const isClose =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
        setShouldAutoScroll(isClose);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.swapIcon}
                    onPress={onSwitchPress}
                >
                    <Image
                        source={
                            sessionType === 'WHITEBOARD'
                                ? ImageIndex.icons.whiteBoard
                                : ImageIndex.icons.chatEditor
                        }
                        style={
                            Platform.OS === 'ios' && Platform.isPad
                                ? { height: 50, width: 50 }
                                : { height: 40, width: 42 }
                        }
                    />
                </TouchableOpacity>
                <View
                    style={[
                        styles.paddingContainer,
                        !!inputSize && { marginBottom: inputSize - 32 },
                    ]}
                >
                    <FlatList
                        style={{ paddingRight: 40 }}
                        ref={chatListRef}
                        data={chat}
                        onViewableItemsChanged={_onViewableItemsChanged}
                        onScrollEndDrag={onScrollEndDrag}
                        renderItem={renderChatElement}
                        keyExtractor={(item, index) => index.toString()}
                        bounces={false}
                    />
                </View>
                <View
                    style={[
                        {
                            position: 'relative',
                            bottom: (inputSize || 0) + 10,
                            zIndex: 3,
                            alignSelf: 'center',
                        },
                    ]}
                >
                    <ChatNewerChatButton
                        newerChats={
                            chat.filter(
                                (x) =>
                                    x.type === 'message' && !x.sentByMe &&
                                    x.seen === false
                            ).length
                        }
                        onPress={() => scrollToEnd()}
                    />
                </View>
                <View
                    style={[
                        styles.wrapperTyping,
                        // isTypping || chatBotIsTyping
                        //     ? { opacity: 0.6 }
                        //     : { opacity: 0 },
                        !!inputSize && { bottom: inputSize - 10, zIndex: 3 },
                    ]}
                >
                    {chatBotIsTyping ? (
                        <ChatTypping userType="chatbot" />
                    ) : null}
                    {isTypping ? (
                        <ChatTypping
                            userType={
                                getPartner()?.isVolunteer
                                    ? 'volunteer'
                                    : 'student'
                            }
                        />
                    ) : null}
                </View>
                <View
                    style={[
                        styles.inputWrapper,
                        {
                            position: 'absolute',
                            bottom: 10,
                            alignSelf: 'center',
                            zIndex: 2,
                        },
                    ]}
                    onLayout={({ nativeEvent }) =>
                        setInputSize(nativeEvent.layout.height)
                    }
                >
                    <View
                        style={{
                            opacity: 0.85,
                            backgroundColor: 'white',
                            height: 32,
                        }}
                    />
                    <ChatInput
                        value={chatMessage}
                        setValue={setChatMessage}
                        onPress={onChatPress}
                        onStartTyping={onStartTyping}
                        onEndTyping={onEndTyping}
                    />
                    {/* </View> */}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingBottom: 20,
    },
    paddingContainer: {
        paddingLeft: 30,
        flex: 1,
    },
    inputWrapper: {
        // marginp: 16,
        paddingHorizontal: 9.5,
    },
    swapIcon: {
        position: 'absolute',
        top: 27,
        left: 21,
        zIndex: 1,
        elevation: 1,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    chatTextInfo: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        marginTop: 15,
        color: Colors.secondaryGray,
        textAlign: 'center',
    },
    wrapperTyping: {
        height: 40,
        width: '100%',
        position: 'absolute',
        // top: -82,
        left: 30 - 9.5,
        zIndex: 1,
    },
});
