import { useEffect } from 'react'
import * as Updates from 'expo-updates'
import axios from 'axios'
import { Alert } from 'react-native'

type useAutoUpdateAppHandlerType = {
  appName: string
  versionUrl: string
  versionRelease: string
}

export function useAutoUpdateAppHandler(props: useAutoUpdateAppHandlerType) {
  useEffect(() => {
    ;(async () => {
      await checkForExpoUpdates()
    })()
  }, [])

  async function getVersion(): Promise<{
    app_version: string
    force_update: boolean
  }> {
    const { data } = await axios.get<{
      app_version: string
      force_update: boolean
    }>(props.versionUrl)
    return data
  }

  async function checkForExpoUpdates() {
    try {
      const [update, version] = await Promise.all([
        Updates.checkForUpdateAsync(),
        getVersion(),
      ])
      if (update.isAvailable) {
        version.force_update ? await forceAlertUpdate() : await alertUpdate()
      }
    } catch (err) {
      console.error(`Error fetching latest Expo update: ${err}`)
    }
  }

  async function alertUpdate() {
    return Alert.alert(
      'Update available',
      `There is a new version of ${props.appName} available. Do you want to download it now?`,
      [
        {
          text: 'NO',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: async () => {
            await Updates.fetchUpdateAsync()
            await Updates.reloadAsync()
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      }
    )
  }

  async function forceAlertUpdate() {
    return Alert.alert(
      'Update available',
      `To continue using ${props.appName} you must update it.`,
      [
        {
          text: 'OK',
          onPress: async () => {
            await Updates.fetchUpdateAsync()
            await Updates.reloadAsync()
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      }
    )
  }
}
