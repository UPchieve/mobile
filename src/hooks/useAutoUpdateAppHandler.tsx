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
      await checkForUpdates()
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

  async function checkForUpdates() {
    const version = await getVersion()
    if (version && version.app_version !== props.versionRelease) {
      if (version.force_update) {
        await forceAlertUpdate()
      } else {
        await alertUpdate()
      }
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
