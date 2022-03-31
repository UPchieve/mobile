const Config = {
    demo: {
        webSocketUrl: 'https://demo.upchieve.org',
        socketUrl: 'wss://demo.upchieve.org',
        baseUrl: 'https://demo.upchieve.org',
        versionUrl: 'https://cdn.upchieve.org/mobile-version/version.json',
        versionRelease: '2.0.0',
    },
    posthog: {
        token: '',
        settings: {
            host: 'https://p.upchieve.org',
            captureApplicationLifecycleEvents: true,
            captureDeepLinks: true,
            iOS: {
                capturePushNotifications: true,
            }
        }
    },
    gleap: {
        token: ''
    }
}

const getConfig = () => Config.demo;

export const config = getConfig();
export const posthogConfig = Config.posthog
export const gleapConfig = Config.gleap
