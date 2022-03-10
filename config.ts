const Config = {
    demo: {
        webSocketUrl: 'https://demo.upchieve.org',
        socketUrl: 'wss://demo.upchieve.org',
        baseUrl: 'https://demo.upchieve.org',
        versionUrl: 'https://cdn.upchieve.org/mobile-version/version.json',
        versionRelease: '2.0.0',
    },
}

const getConfig = () => Config.demo;

export const config = getConfig();