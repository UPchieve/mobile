import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useReducer, useState } from 'react'

import { Keyboard, StyleSheet, View } from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonKeyboardAvoidingView } from '../components/common/CommonKeyboardAvoidingView';
import { AppLoading } from '../components/molecules/common/AppLoading';
import { CurrentSessionHeader } from "../components/molecules/common/CurrentSessionHeader";
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

    const [showChat, setShowChat] = useState<boolean>(true);

    useEffect(() => {
        console.log('complete user', user);

        console.log(`Joining to ${sessionId}, as Volunteer:${user.isVolunteer}`);

        socketHandler.emit(
            'join',
            {
                sessionId: sessionId,
                user: user,
                joinedFrom: '',
            }
        );
    }, [sessionId]);

    const onSwitchPress = () => {
        Keyboard.dismiss();
        setShowChat((oldValue) => !oldValue);
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
        <SafeAreaView style={{ flex: 1, }}>
            <CommonKeyboardAvoidingView style={{ flex: 1, }}>
                <MenuProvider>
                    <CurrentSessionHeader navigation={navigation} />
                    <View style={[styles.visiblePageWrapper, !showChat && styles.hiddenPageWrapper]}>
                        <ChatScreen
                            onSwitchPress={onSwitchPress}
                            sessionType={getSessionType(sessionState!)}
                            chat={chat} dispatch={dispatchChat}
                        />
                    </View>
                    <View style={[styles.visiblePageWrapper, showChat && styles.hiddenPageWrapper]}>
                        {renderElement()}
                    </View>
                </MenuProvider>
            </CommonKeyboardAvoidingView>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    visiblePageWrapper: {
        flex: 1,
        display: 'flex'
    },
    hiddenPageWrapper: {
        display: 'none',
    }
});