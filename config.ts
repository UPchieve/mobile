const Config = {
    local: {
        marketingUrl: 'https://upchieve.org',
        webSocketUrl: 'ws://localhost:3001',
        whiteboardSocketUrl: 'ws://localhost:3000',
        baseUrl: 'http://localhost:3000',
        versionUrl: 'https://cdn.upchieve.org/mobile-version/version.json',
        versionRelease: '2.0.0',
    },
    demo: {
        webSocketUrl: 'wss://demo.upchieve.org',
        whiteboardSocketUrl: 'wss://demo.upchieve.org',
        baseUrl: 'https://demo.upchieve.org',
        versionUrl: 'https://cdn.upchieve.org/mobile-version/version.json',
        versionRelease: '2.0.0',
    },
    staging: {
        marketingUrl: 'https://upchieve.org',
        webSocketUrl: 'wss://staging.upchieve.org',
        whiteboardSocketUrl: 'wss://staging.upchieve.org',
        baseUrl: 'https://staging.upchieve.org',
        versionUrl: 'https://cdn.upchieve.org/mobile-version/version.json',
        versionRelease: '2.0.0',
    },
    prod: {
        marketingUrl: 'https://upchieve.org',
        webSocketUrl: 'wss://app.upchieve.org',
        whiteboardSocketUrl: 'wss://app.upchieve.org',
        baseUrl: 'https://app.upchieve.org',
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

const getConfigDemo = () => Config.demo;
const getConfigProd = () => Config.prod;
const getConfigStaging = () => Config.staging;
const getConfigLocal = () => Config.local;

export const config = getConfigProd();
export const posthogConfig = Config.posthog
export const gleapConfig = Config.gleap

