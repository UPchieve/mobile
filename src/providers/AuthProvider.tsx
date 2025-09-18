import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useUserState, useUserStateType } from '../hooks/useUserState'
import { Student, User, Volunteer } from '../models/user'
import { authService } from '../services/authService'
import { SessionStateChangedSocketType } from '../types/socketTypes'
import { socket } from '../utils/socketHandler'
import messaging from '@react-native-firebase/messaging'
import crashlytics from '@react-native-firebase/crashlytics'
import { Socket } from 'socket.io-client'

type SocketHandler = {
  emit: (event: string, payload: Object) => void
  emitWithAck: (event: string, payload: Object) => any
  timeout: (timeoutInMs: number) => Socket
  on: (event: string, listener: (payload: any) => void) => () => void
}
export interface AuthContext {
  socketHandler: SocketHandler
  isSocketConnected: boolean
  user?: User
  refreshUser: () => void
  userState: useUserStateType
  loadingUser: boolean
  sessionState?: SessionStateChangedSocketType
  setSessionState: Dispatch<
    SetStateAction<SessionStateChangedSocketType | undefined>
  >
}
export const AuthContext = React.createContext<AuthContext>({} as AuthContext)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connected, setConnected] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | undefined>(undefined)
  const userState = useUserState(user)
  const [sessionState, setSessionState] = useState<
    SessionStateChangedSocketType | undefined
  >()
  const emit = (event: string, payload: Object) => {
    socket.emit(event, payload)
  }
  const emitWithAck = async (event: string, payload: Object) => {
    return socket.emitWithAck(event, payload)
  }
  const timeout = (timeoutInMs: number) => {
    return socket.timeout(timeoutInMs)
  }
  const on = (
    event: string,
    listener: (payload: Object) => void
  ): (() => void) => {
    socket.on(event, listener)
    return () => socket.off(event)
  }
  const loadUser = async () => {
    setUser(undefined)
    try {
      setLoading(true)
      const user = await authService.getCurrentUser()
      if (user) {
        setUser(user)
        const pushToken = await messaging().getToken()
        await authService.savePushToken(pushToken)
      }
      setupCrashlytics(user)
    } catch (error: any) {
      crashlytics().recordError(error)
    } finally {
      setLoading(false)
    }
  }

  const setupCrashlytics = (user: (Student | Volunteer) | null) => {
    if (user) {
      crashlytics().log('User login')
      crashlytics().setUserId(user.id)
    } else {
      crashlytics().log('User logout')
    }
  }

  useEffect(() => {
    setConnected(false)
    setSessionState(undefined)
    socket.off()
    socket.disconnect()
    if (user) {
      socket.on('connect', () => {
        setConnected(true)
      })

      socket.on('session-change', (value: SessionStateChangedSocketType) => {
        setSessionState(value)
      })

      socket.on('disconnect', (reason: string) => {
        setConnected(false)
        if (reason === 'io client disconnect') return
        if (reason === 'io server disconnect') {
          // The disconnection was initiated by the server, you need to reconnect manually.
          socket.connect()
        }
      })

      socket.on('error', (error: Error) => {
        console.error(error)
        setConnected(false)
      })

      socket.connect()
    }
    return () => {
      socket.disconnect()
    }
  }, [user])
  return (
    <AuthContext.Provider
      value={{
        loadingUser: loading,
        socketHandler: { emit, emitWithAck, timeout, on },
        isSocketConnected: connected,
        user,
        sessionState,
        userState,
        setSessionState,
        refreshUser: () => loadUser(),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
