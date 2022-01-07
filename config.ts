const Config = {
    demo: {
        webSocketUrl: 'https://demo.upchieve.org',
        socketUrl: 'wss://demo.upchieve.org',
        baseUrl: 'https://demo.upchieve.org'
    }
}

const getConfig = () => Config.demo;

export const config = getConfig();