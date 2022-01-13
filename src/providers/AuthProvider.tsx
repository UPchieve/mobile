import React, { useEffect, useState } from "react";
import { Session } from "../interfaces/sessionInterfaces";
import { User } from "../models/user";
import { authService } from "../services/authService";
import { sessionService } from "../services/sessionService";
import { socketHandler } from "../utils/socketHandler";

interface SocketHandlerType {
    emit: (event: string, payload?: object) => void;
    on: (event: string, listener: (payload?: any) => void) => () => void;
    connected: boolean;
}

export interface AuthContext {
    socketHandler: SocketHandlerType,
    user: User,
    currentSession?: Session,
}
export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
export const AuthProvider: React.FC = ({ children }) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [user, setUser] = useState<User>({} as User);
    const [currentSession, setCurrentSession] = useState<Session | undefined>();
    const emit = (event: string, payload?: object) => {
        socketHandler.emit(event, payload);
    }
    const on = (event: string, listener: (payload?: object) => void): () => void => {
        console.log('executing', event);
        socketHandler.on(event, listener);
        return () => socketHandler.off(event);
    }
    const loadUser = async () => {
        const user = await authService.getCurrentUser();
        if (user) {
            setUser(user);
            try {
                const session = await sessionService.getCurrentSession();
                setCurrentSession(session);
            } catch { }
        }
    }
    useEffect(() => {
        loadUser();
        console.log('hook handled.');
        socketHandler.connect();
        console.log('connected method executed.');
        socketHandler.on('connect', () => {
            console.log('connected.');
            setConnected(true);
        });
        return () => socketHandler.disconnect();
    }, []);
    return <AuthContext.Provider value={{
        socketHandler: { connected, on, emit },
        user,
        currentSession,
    }}>
        {children}
    </AuthContext.Provider>
}