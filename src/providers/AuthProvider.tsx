import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import { userStateType, useUserState, useUserStateType } from "../hooks/useUserState";
import { Student, User, Volunteer } from "../models/user";
import { authService } from "../services/authService";
import { SessionStateChangedSocketType } from "../types/socketTypes";
import { socketHandler, } from "../utils/socketHandler";
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';

interface SocketHandlerType {
    emit: (event: string, payload?: object) => void;
    on: (event: string, listener: (payload?: any) => void) => () => void;
    connected: boolean;
}

export interface AuthContext {
    socketHandler: SocketHandlerType,
    user?: User,
    refreshUser: () => void,
    userState: useUserStateType;
    loadingUser: boolean;
    sessionState?: SessionStateChangedSocketType,
    setSessionState: Dispatch<SetStateAction<SessionStateChangedSocketType | undefined>>
}
export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
export const AuthProvider: React.FC = ({ children }) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | undefined>(undefined);
    const userState = useUserState(user);
    const [sessionState, setSessionState] = useState<SessionStateChangedSocketType | undefined>();
    const emit = (event: string, payload?: object) => {
        socketHandler.emit(event, payload);
    }
    const on = (event: string, listener: (payload?: object) => void): () => void => {
        socketHandler.on(event, listener);
        return () => socketHandler.off(event);
    }
    const loadUser = async () => {
        setUser(undefined);
        try {
            setLoading(true)
            const user = await authService.getCurrentUser();
            if (user) {
                setUser(user);
                //find and set push notifications token
                const pushToken = await messaging().getToken();
                console.log('push Token', pushToken);
                await authService.savePushToken(pushToken);
            }
            setupCrashlytics(user);
        } catch (error: any) {
            crashlytics().recordError(error);
        }
        finally {
            setLoading(false);
        }
    }

    const setupCrashlytics = (user: (Student | Volunteer) | null) => {
        if (user) {
            crashlytics().log('User login');
            crashlytics().setUserId(user._id);
            crashlytics().setAttributes({
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
            });
        } else {
            crashlytics().log('User logout');
        }
    }

    useEffect(() => {
        setConnected(false);
        setSessionState(undefined);
        socketHandler.off();
        socketHandler.disconnect();
        if (user) {
            socketHandler.connect();
            socketHandler.on('connect', () => {
                setConnected(true);
            });
            socketHandler.on('session-change', (value: SessionStateChangedSocketType) => {
                console.log('sessionState', value)
                setSessionState(value);
            });
        }
        return () => socketHandler.disconnect();
    }, [user]);
    return <AuthContext.Provider value={{
        loadingUser: loading,
        socketHandler: { connected, on, emit },
        user,
        sessionState,
        userState,
        setSessionState,
        refreshUser: () => loadUser()
    }}>
        {children}
    </AuthContext.Provider>
}
