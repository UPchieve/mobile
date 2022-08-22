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
  async (e) => {
    // TODO: replace `localhost` with IP at runtime when in development mode on Android
    if (
      process.env.NODE_ENV === 'development' &&
      Platform.OS === 'android' &&
      config.baseUrl.includes('localhost')
    )
      console.warn(
        'Replace `localhost` in `BASE_URL`, `WEBSOCKET_URL`, and `WHITEBOARD_WEBSOCKET_URL` with your IP address when working with Android on development mode. You must use your ip instead of localhost.'
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

    e.headers = {
      'x-csrf-token': csrfToken,
    }
    return e
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default http
