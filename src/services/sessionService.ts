import { Session } from "../interfaces/sessionInterfaces";
import http from "./http"

const getCurrentSession = async (): Promise<Session> => {
    const response = await http.post<Session>('/api/session/current');
    return response.data;
}

const endSession = async (sessionId: string): Promise<void> => {
    const { data } = await http.post('/api/session/end', {
        sessionId,
    });
    return data;
}

export const sessionService = {
    getCurrentSession,
    endSession
}