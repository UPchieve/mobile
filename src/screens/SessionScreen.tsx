import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react'

import { Keyboard, StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonKeyboardAvoidingView } from '../components/common/CommonKeyboardAvoidingView';
import { AppLoading } from '../components/molecules/common/AppLoading';
import { CurrentSessionHeader } from "../components/molecules/common/CurrentSessionHeader";
import { AuthContext } from '../providers/AuthProvider';
import { MainStackParamList } from '../routes/MainStackNavigator';
import { getSessionType,} from '../utils/utils';
import { ChatScreen } from "./ChatScreen"
import { DocEditorScreen } from './DocEditorScreen';
import { WhiteBoardScreen } from './WhiteBoardScreen';

type SessionScreenType = NativeStackScreenProps<MainStackParamList, 'Session'>;
export const SessionScreen: React.FC<SessionScreenType> = ({ route, navigation }) => {
    const { sessionId } = route.params;
    const { user, sessionState ,socketHandler } = useContext(AuthContext);
    const [showChat, setShowChat] = useState<boolean>(true);
    const onSwitchPress = () => {
        Keyboard.dismiss();
        setShowChat((oldValue) => !oldValue);
    }

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
        const sessionType = getSessionType(sessionState!);
        return sessionType === 'DOCUMENT'
            ? <DocEditorScreen sessionId={sessionId} onSwitchPress={onSwitchPress} />
            : <WhiteBoardScreen sessionId={sessionId} onSwitchPress={onSwitchPress} />
    }

    if (!sessionState) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <CommonKeyboardAvoidingView style={{ flex: 1, }}>
                <CurrentSessionHeader navigation={navigation}/>
                <View style={[styles.visiblePageWrapper, !showChat && styles.hiddenPageWrapper]}>
                    <ChatScreen onSwitchPress={onSwitchPress} sessionType={getSessionType(sessionState!)} />
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