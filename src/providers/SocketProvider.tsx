import React, { useEffect, useState } from "react";
import { socketHandler } from "../utils/socketHandler";

export interface SocketContext {
    emit: (event: string, payload?: object) => void;
    on: (event: string, listener: (payload?: object) => void) => () => void;
    connected: boolean;
}
export const SocketContextComponent = React.createContext<SocketContext>({} as SocketContext);
export const SocketProvider: React.FC = ({ children }) => {
    const [connected, setConnected] = useState<boolean>(false);
    const emit = (event: string, payload?: object) => {
        socketHandler.emit(event, payload);
    }
    const on = (event: string, listener: (payload?: object) => void): () => void => {
        console.log('executing', event);
        socketHandler.on(event, listener);
        return () => socketHandler.off(event);
    }
    useEffect(() => {
        console.log('hook handled.');
        socketHandler.connect();
        console.log('connected method executed.');
        socketHandler.on('connect', () => {
            console.log('connected.');
            setConnected(true);
        });
        return () => socketHandler.disconnect();
    }, []);
    return <SocketContextComponent.Provider value={{
        connected, on, emit
    }}>
        {children}
    </SocketContextComponent.Provider>
}