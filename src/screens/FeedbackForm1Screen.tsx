import React from 'react';
import { Text, View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SessionFeedbackHeader } from '../components/atoms/session-experience/SessionFeedbackHeader';

export const FeedbackForm1Screen = () => {
    return <SafeAreaView>
        <SessionFeedbackHeader />
        <KeyboardAwareScrollView>
            
        </KeyboardAwareScrollView>
    </SafeAreaView>
}