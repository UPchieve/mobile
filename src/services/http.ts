import axios from 'axios'
import { Platform } from 'react-native'
import { config } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const csrfStorage = 'x-csrf-token'
const http = axios.create({
  baseURL: config.baseUrl,
})

const getCsrfToken = async (): Promise<string> => {
  const { data } = await axios.get<{ csrfToken: string }>(
    `${config.baseUrl}/api/csrftoken`
  )
  return data.csrfToken
}

http.interceptors.request.use(
  async (requestConfig) => {
    // TODO: replace `localhost` with 10.0.2.2 at runtime when in development mode on Android
    if (
      process.env.NODE_ENV === 'development' &&
      Platform.OS === 'android' &&
      config.baseUrl.includes('localhost')
    )
      console.warn(
        'Replace `localhost` in `EXPO_PUBLIC_BASE_URL`, `EXPO_PUBLIC_WEBSOCKET_URL`, and `WHITEBOARD_EXPO_PUBLIC_WEBSOCKET_URL` with 10.0.2.2 when developing Android locally.'
      )
    let csrfToken: string = ''
    try {
      // const value = await AsyncStorage.getItem(csrfStorage);
      const value = null
      if (value !== null) {
        csrfToken = value
      } else {
        csrfToken = await getCsrfToken()
        AsyncStorage.setItem(csrfStorage, csrfToken)
      }
    } catch (error) {}

    requestConfig.headers['x-csrf-token'] = csrfToken

    return requestConfig
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default http
