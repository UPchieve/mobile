import React from 'react'
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'

export const CommonKeyboardAvoidingView: React.FC<
  KeyboardAvoidingViewProps
> = ({ children, ...props }) => {
  const headerHeight = useHeaderHeight()
  // const headerHeight = 40;
  return (
    <KeyboardAvoidingView
      enabled
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.select({
        android: undefined,
        ios: 'padding',
      })}
      keyboardVerticalOffset={Platform.select({
        android: 0,
        ios: headerHeight,
      })}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
