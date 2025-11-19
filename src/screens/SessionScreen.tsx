import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { backOff } from 'exponential-backoff'
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { AppState, Keyboard, Platform, StyleSheet, View } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CommonKeyboardAvoidingView } from '../components/common/CommonKeyboardAvoidingView'
import { AppLoading } from '../components/molecules/common/AppLoading'
import { CurrentSessionHeader } from '../components/molecules/common/CurrentSessionHeader'
import { useOrientation } from '../hooks/useOrientation'
import { AuthContext } from '../providers/AuthProvider'
import { AlertContext } from '../providers/AlertProvider'
import { ChatItem, chatReducer } from '../reducers/chatReducer'
import { MainStackParamList } from '../routes/MainStackNavigator'
import { getSessionType } from '../utils/utils'
import { ChatScreen } from './ChatScreen'
import { DocEditorScreen } from './DocEditorScreen'
import { WhiteBoardScreen } from './WhiteBoardScreen'
import { captureEvent } from '../services/analyticsService'
import { EVENTS } from '../types/services/analyticsServiceTypes'
import { SvgIcons } from '../../assets/IndexIcons'
import { useFocusEffect } from '@react-navigation/native'

type SessionScreenType = NativeStackScreenProps<MainStackParamList, 'Session'>
export const SessionScreen: React.FC<SessionScreenType> = ({
  route,
  navigation,
}) => {
  const { sessionId } = route.params
  const [chat, dispatchChat] = useReducer(chatReducer, [])
  const { sessionState, socketHandler, isSocketConnected } =
    useContext(AuthContext)
  const { showAlert } = useContext(AlertContext)
  const insets = useSafeAreaInsets()
  const [showChat, setShowChat] = useState<boolean>(true)
  const [isZwibserveSession, setZwibserveSession] = useState<boolean>(false)
  const { orientation, lockAsync, unlockAsync } = useOrientation()

  const timer = useRef<any>(null)

  const joinSocketSession = async () => {
    try {
      await backOff(async () => {
        const { success, retry, isZwibserveSession } = await socketHandler
          .timeout(2000)
          .emitWithAck('sessions:join', {
            sessionId,
          })

        if (retry) {
          captureEvent(EVENTS.SOCKET_SESSION_JOIN_RETRY, {
            sessionId,
            isMobile: true,
          })
          const msg =
            'Received retry signal, try joining socket session room again.'
          console.error(msg)
          throw new Error(msg)
        }

        if (success) {
          captureEvent(EVENTS.SOCKET_SESSION_JOINED, {
            sessionId,
            isMobile: true,
          })
          if (isZwibserveSession) setZwibserveSession(true)
        }
      })
    } catch (err) {
      showAlert({
        title: `Uh oh, we're having trouble connecting you to the session chat.`,
        text: 'Please try closing and reopening the app.',
        icon: SvgIcons.StopIcon,
        type: 'error',
        confirmText: 'Ok',
      })
      captureEvent(EVENTS.SOCKET_SESSION_JOIN_FAILED, {
        sessionId,
        isMobile: true,
      })
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (isSocketConnected && sessionId) {
        joinSocketSession()
      }

      return () => {
        socketHandler.emit('sessions:leave', { sessionId })
      }
    }, [isSocketConnected, sessionId])
  )

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        socketHandler.emit('sessions:leave', {
          sessionId,
        })
      } else if (nextAppState === 'active' && isSocketConnected && sessionId) {
        joinSocketSession()
      }
    }

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      subscription?.remove()
      socketHandler.emit('sessions:leave', {
        sessionId,
      })
    }
  }, [isSocketConnected, sessionId])

  useEffect(() => {
    clearTimeout(timer.current)
    if (!sessionState) {
      timer.current = setTimeout(() => {
        navigation.navigate('DashboardScreen')
      }, 5000)
    }
  }, [sessionState])

  useEffect(() => {
    if (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      getSessionType(sessionState!) === 'WHITEBOARD'
    ) {
      unlockAsync()
    }
    return () => {
      lockAsync('PORTRAIT')

      if (timer) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  useEffect(() => {
    Keyboard.dismiss()
    if (getSessionType(sessionState!) === 'WHITEBOARD') {
      setShowChat(orientation === 'PORTRAIT')
    }
  }, [orientation])

  const onSwitchPress = async () => {
    Keyboard.dismiss()
    setShowChat((oldValue) => !oldValue)
    if (Platform.OS === 'ios' && Platform.isPad) {
      await lockAsync('LANDSCAPE')
    }
    // else {
    //     if (showChat && getSessionType(sessionState!) === 'WHITEBOARD') {
    //         await lockAsync('LANDSCAPE');
    //     } else {
    //         await lockAsync('PORTRAIT');
    //     }
    // }
  }

  const hasNotifications = () =>
    chat.filter(
      (x) => x.type === 'message' && x.sentByMe === false && x.seen === false
    ).length > 0
  const renderElement = () => {
    const sessionType = getSessionType(sessionState!)
    return sessionType === 'DOCUMENT' ? (
      <DocEditorScreen
        sessionId={sessionId}
        onSwitchPress={onSwitchPress}
        hasNotifications={hasNotifications()}
      />
    ) : (
      <WhiteBoardScreen
        sessionId={sessionId}
        onSwitchPress={onSwitchPress}
        hasNotifications={hasNotifications()}
        isZwibserveSession={isZwibserveSession}
      />
    )
  }

  if (!sessionState) {
    return <AppLoading />
  }

  return (
    <CommonKeyboardAvoidingView
      style={{ flex: 1, paddingBottom: insets.bottom }}
    >
      <MenuProvider>
        {orientation === 'PORTRAIT' ||
        (Platform.OS === 'ios' && Platform.isPad) ? (
          <CurrentSessionHeader
            navigation={navigation}
            messages={chat?.filter((x) => x.type === 'message') as ChatItem[]}
          />
        ) : null}
        <View
          style={[
            styles.visiblePageWrapper,
            !showChat && styles.hiddenPageWrapper,
            { backgroundColor: 'white' },
          ]}
        >
          <ChatScreen
            showChat={showChat}
            onSwitchPress={onSwitchPress}
            sessionType={getSessionType(sessionState!)}
            chat={chat}
            dispatch={dispatchChat}
          />
        </View>
        <View
          style={[
            styles.visiblePageWrapper,
            showChat && styles.hiddenPageWrapper,
            { paddingBottom: 12, backgroundColor: 'white' },
          ]}
        >
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
  },
})
