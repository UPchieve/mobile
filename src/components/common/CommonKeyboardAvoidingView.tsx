import React from 'react';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';

export const CommonKeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({ children, ...props }) => {
    const headerHeight = useHeaderHeight();
    return <KeyboardAvoidingView
        behavior={Platform.select({
            "android": undefined,
            "ios": "padding"
        })}
        keyboardVerticalOffset={Platform.select({
            "android": 0,
            "ios": headerHeight
        })}
        {...props}>
        {children}
    </KeyboardAvoidingView>
}