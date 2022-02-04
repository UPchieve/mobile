import React, { useEffect, useState } from "react";
import { User } from "../models/user";
import { authService } from "../services/authService";
import { SessionStateChangedSocketType } from "../types/socketTypes";
import { socketHandler, } from "../utils/socketHandler";

interface SocketHandlerType {
    emit: (event: string, payload?: object) => void;
    on: (event: string, listener: (payload?: any) => void) => () => void;
    connected: boolean;
}

export interface AuthContext {
    socketHandler: SocketHandlerType,
    user?: User,
    refreshUser: () => void,
    loadingUser: boolean;
    sessionState?: SessionStateChangedSocketType,
}
export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
export const AuthProvider: React.FC = ({ children }) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | undefined>(undefined);

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
            }
        } catch (error) {

        }
        finally{
            setLoading(false);
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
        refreshUser: () => loadUser()
    }}>
        {children}
    </AuthContext.Provider>
}