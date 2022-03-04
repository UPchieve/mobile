import { useEffect } from "react"
import messaging from '@react-native-firebase/messaging';
// import {Linking} from 'react-native'
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';

export const useNotificationHandler = () => {

    const handleChatNotification = async (sessionId: string) => {
        const url = Linking.makeUrl(`session/${sessionId}`);
        console.log('Linking to ', url);
        await Linking.openURL(url);
    }

    const handleNotification = async (data: UpchieveNotification) => {
        console.log('handling notification for chat', data);

        if (data) {
            switch (data.type) {
                case 'chat':
                    await handleChatNotification(data.sessionId);
                    break;
            }
        }
    }

    useEffect(() => {

        messaging().getToken().then((token) => console.log(token));

        messaging().onNotificationOpenedApp(async (event) => {
            SplashScreen.preventAutoHideAsync();
            // await handleNotification(event.data as UpchieveNotification);
        });

        // messaging().getInitialNotification().then(e => {
        //     console.log(e);
        // })

        // messaging().getInitialNotification().then(event => {
        //     console.log(event);
            
        //     // if (event) {
        //     //     await handleNotification(event.data as UpchieveNotification);
        //     // }
        // })

        messaging().onMessage((e) => {
            console.log('on message executed');
        })
    }, []);
}

type SessionNotification = {
    type: 'chat',
    sessionId: string,
}
type UpchieveNotification = SessionNotification | undefined;