import {
  MARKETING_URL,
  WEBSOCKET_URL,
  WHITEBOARD_WEBSOCKET_URL,
  BASE_URL,
  VERSION_URL,
  VERSION_RELEASE,
  POSTHOG_TOKEN,
  POSTHOG_HOST,
  GLEAP_TOKEN,
} from 'react-native-dotenv'

const Config = {
  app: {
    marketingUrl: MARKETING_URL,
    webSocketUrl: WEBSOCKET_URL,
    whiteboardSocketUrl: WHITEBOARD_WEBSOCKET_URL,
    baseUrl: BASE_URL,
    versionUrl: VERSION_URL,
    versionRelease: VERSION_RELEASE,
  },
  posthog: {
    token: POSTHOG_TOKEN,
    settings: {
      host: POSTHOG_HOST,
      captureApplicationLifecycleEvents: true,
      captureDeepLinks: true,
      iOS: {
        capturePushNotifications: true,
      },
    },
  },
  gleap: {
    token: GLEAP_TOKEN,
  },
}

const getConfig = () => Config.app
export const config = getConfig()
export const posthogConfig = Config.posthog
export const gleapConfig = Config.gleap
