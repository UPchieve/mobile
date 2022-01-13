import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react'

import { Keyboard, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonKeyboardAvoidingView } from '../components/common/CommonKeyboardAvoidingView';
import { AppLoading } from '../components/molecules/common/AppLoading';
import { CurrentSessionHeader } from "../components/molecules/common/CurrentSessionHeader";
import { AuthContext } from '../providers/AuthProvider';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { SessionStateChangedSocketType } from '../types/socketTypes';
import { getSessionType, isSessionEnded } from '../utils/utils';
import { ChatScreen } from "./ChatScreen"
import { DocEditorScreen } from './DocEditorScreen';
import { WhiteBoardScreen } from './WhiteBoardScreen';

type SessionScreenType = NativeStackScreenProps<MainStackParamList, 'Session'>;
export const SessionScreen: React.FC<SessionScreenType> = ({ route }) => {
    const { sessionId } = route.params;
    const { user, currentSession, socketHandler } = useContext(AuthContext);
    const [sessionState, setSessionState] = useState<SessionStateChangedSocketType | undefined>();
    const [showChat, setShowChat] = useState<boolean>(true);
    const onSwitchPress = () => {
        Keyboard.dismiss();
        setShowChat((oldValue) => !oldValue);
    }

    useEffect(() => {
        const unsubscribe = socketHandler.on('session-change', (data: SessionStateChangedSocketType) => {
            setSessionState(data);
        })
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        socketHandler.emit(
            'join',
            {
                sessionId: sessionId,
                user,
                joinedFrom: '',
            }
        );
    }, [sessionId]);

    const renderElement = () => {
        const sessionType = getSessionType(currentSession!);
        return <DocEditorScreen sessionId={sessionId} onSwitchPress={onSwitchPress} />
        // return sessionType === 'DOCUMENT'
        //     ? <DocEditorScreen sessionId={sessionId} onSwitchPress={onSwitchPress} />
        //     : <WhiteBoardScreen sessionId={sessionId} onSwitchPress={onSwitchPress} />
    }

    if (!sessionState) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <CommonKeyboardAvoidingView style={{ flex: 1, }}>
                <CurrentSessionHeader isSessionEnded={isSessionEnded(sessionState)} />
                <View style={[styles.visiblePageWrapper, !showChat && styles.hiddenPageWrapper]}>
                    <ChatScreen sessionId={sessionId} onSwitchPress={onSwitchPress} sessionType={getSessionType(currentSession!)} />
                </View>
                <View style={[styles.visiblePageWrapper, showChat && styles.hiddenPageWrapper]}>
                    {renderElement()}
                </View>
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