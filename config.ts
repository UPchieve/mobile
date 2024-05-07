const Config = {
  app: {
    marketingUrl: process.env.EXPO_PUBLIC_MARKETING_URL,
    webSocketUrl: process.env.EXPO_PUBLIC_WEBSOCKET_URL,
    whiteboardSocketUrl: process.env.EXPO_PUBLIC_WHITEBOARD_WEBSOCKET_URL,
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
    versionUrl: process.env.EXPO_PUBLIC_VERSION_URL,
    versionRelease: process.env.EXPO_PUBLIC_VERSION_RELEASE,
  },
  posthog: {
    token: process.env.EXPO_PUBLIC_POSTHOG_TOKEN,
    settings: {
      host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
      captureApplicationLifecycleEvents: true,
      captureDeepLinks: true,
      iOS: {
        capturePushNotifications: true,
      },
    },
  },
  gleap: {
    token: process.env.EXPO_PUBLIC_GLEAP_TOKEN,
  },
  newrelic: {
    iosToken: process.env.EXPO_PUBLIC_NEWRELIC_IOS_TOKEN,
    androidToken: process.env.EXPO_PUBLIC_NEWRELC_ANDROID_TOKEN,
  },
}

const getConfig = () => Config.app
export const config = getConfig()
export const posthogConfig = Config.posthog
export const gleapConfig = Config.gleap
export const newrelicConfig = Config.newrelic
