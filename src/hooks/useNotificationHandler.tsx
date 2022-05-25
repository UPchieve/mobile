import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import * as Linking from 'expo-linking'

export const useNotificationHandler = (isNavigationReady: boolean) => {
  const handleChatNotification = async (sessionId: string) => {
    const url = Linking.makeUrl(`session/${sessionId}`)
    console.log('Linking to ', url)
    await Linking.openURL(url)
  }

  const handleNotification = async (data: UpchieveNotification) => {
    console.log('handling notification for chat', data)
    if (data) {
      switch (data.type) {
        case 'chat':
          await handleChatNotification(data.sessionId)
          break
      }
    }
  }

  useEffect(() => {
    messaging().onNotificationOpenedApp(async (event) => {
      await handleNotification(event.data as UpchieveNotification)
    })

    messaging()
      .getInitialNotification()
      .then((event) => {
        if (event) {
          setTimeout(() => {
            handleNotification(event.data as UpchieveNotification)
          }, 1000)
        }
      })

    messaging().onMessage((e) => {
      //foreground messages.
    })
  }, [])
}

type SessionNotification = {
  type: 'chat'
  sessionId: string
}
type UpchieveNotification = SessionNotification | undefined
