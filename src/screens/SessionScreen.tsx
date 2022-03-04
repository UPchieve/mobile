import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'

import { Keyboard, StyleSheet, View } from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../assets/Colors';
import { CommonKeyboardAvoidingView } from '../components/common/CommonKeyboardAvoidingView';
import { AppLoading } from '../components/molecules/common/AppLoading';
import { CurrentSessionHeader } from "../components/molecules/common/CurrentSessionHeader";
import { useOrientation } from '../hooks/useOrientation';
import { AuthContext } from '../providers/AuthProvider';
import { chatReducer } from '../reducers/chatReducer';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { getSessionType, } from '../utils/utils';
import { ChatScreen } from "./ChatScreen"
import { DocEditorScreen } from './DocEditorScreen';
import { WhiteBoardScreen } from './WhiteBoardScreen';

type SessionScreenType = NativeStackScreenProps<MainStackParamList, 'Session'>;
export const SessionScreen: React.FC<SessionScreenType> = ({ route, navigation }) => {
    const { sessionId } = route.params;
    const [chat, dispatchChat] = useReducer(chatReducer, []);
    const authContext = useContext(AuthContext);
    const { sessionState, socketHandler } = authContext;
    const user = authContext.user!;
    const insets = useSafeAreaInsets();
    const [showChat, setShowChat] = useState<boolean>(true);

    const timer = useRef<any>(null);

    useEffect(() => {
        console.log(sessionId);

        socketHandler.emit(
            'join',
            {
                sessionId: sessionId,
                user: user,
                joinedFrom: '',
            }
        );
    }, [sessionId]);

    useEffect(() => {
        console.log('entre al efecto');
        
        clearTimeout(timer.current);
        if (!sessionState) {
            console.log('creo el timer!');
            
            timer.current = setTimeout(() => {
                navigation.navigate('DashboardScreen');
            }, 5000)
        }
    }, [sessionState]);

    useEffect(() => {
        return () => {
            lockAsync('PORTRAIT');
            if (timer) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    const { orientation, lockAsync } = useOrientation();

    const onSwitchPress = async () => {
        Keyboard.dismiss();
        setShowChat((oldValue) => !oldValue);
        if (showChat && getSessionType(sessionState!) === 'WHITEBOARD') {
            await lockAsync('LANDSCAPE');
        } else {
            await lockAsync('PORTRAIT');
        }
    }

    const hasNotifications = () => chat.filter(x => x.type === 'message' && (x.sentByMe === false && x.seen === false)).length > 0;
    const renderElement = () => {
        const sessionType = getSessionType(sessionState!);
        return sessionType === 'DOCUMENT'
            ? <DocEditorScreen sessionId={sessionId} onSwitchPress={onSwitchPress} hasNotifications={hasNotifications()} />
            : <WhiteBoardScreen sessionId={sessionId} onSwitchPress={onSwitchPress} hasNotifications={hasNotifications()} />
    }

    if (!sessionState) {
        return <AppLoading />
    }

    return (
        <CommonKeyboardAvoidingView style={{ flex: 1, paddingBottom: insets.bottom }}>
            <MenuProvider>
                {orientation === 'PORTRAIT' ?
                    < CurrentSessionHeader navigation={navigation} />
                    : null
                }
                <View style={[styles.visiblePageWrapper, !showChat && styles.hiddenPageWrapper, { backgroundColor: 'white' }]}>
                    <ChatScreen
                        onSwitchPress={onSwitchPress}
                        sessionType={getSessionType(sessionState!)}
                        chat={chat} dispatch={dispatchChat}
                    />
                </View>
                <View style={[styles.visiblePageWrapper, showChat && styles.hiddenPageWrapper, { paddingBottom: 12, backgroundColor: 'white' }]}>
                    {renderElement()}
                </View>
            </MenuProvider>
        </CommonKeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    visiblePageWrapper: {
        flex: 1,
        display: 'flex',
    },
    hiddenPageWrapper: {
        display: 'none',
    }
});
