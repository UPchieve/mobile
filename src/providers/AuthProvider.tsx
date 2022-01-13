import React, { useEffect, useState } from "react";
import { Session } from "../interfaces/sessionInterfaces";
import { User } from "../models/user";
import { authService } from "../services/authService";
import { sessionService } from "../services/sessionService";
import { SessionStateChangedSocketType } from "../types/socketTypes";
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
    sessionState?: SessionStateChangedSocketType,
}
export const AuthContext = React.createContext<AuthContext>({} as AuthContext);
export const AuthProvider: React.FC = ({ children }) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [user, setUser] = useState<User>({} as User);
    const [currentSession, setCurrentSession] = useState<Session | undefined>();
    const [sessionState, setSessionState] = useState<SessionStateChangedSocketType | undefined>();
    const emit = (event: string, payload?: object) => {
        socketHandler.emit(event, payload);
    }
    const on = (event: string, listener: (payload?: object) => void): () => void => {
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
        socketHandler.connect();
        socketHandler.on('connect', () => {
            setConnected(true);
        });
        socketHandler.on('session-change', (value: SessionStateChangedSocketType) => {
            setSessionState(value);
        });
        return () => socketHandler.disconnect();
    }, []);
    return <AuthContext.Provider value={{
        socketHandler: { connected, on, emit },
        user,
        currentSession,
        sessionState,
    }}>
        {children}
    </AuthContext.Provider>
}