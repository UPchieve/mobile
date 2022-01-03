import { Session } from "../interfaces/sessionInterfaces";
import http from "./http"

const getCurrentSession = async (): Promise<Session> => {
    const response = await http.post<Session>('/api/session/current');
    return response.data;
}

export const sessionService = {
    getCurrentSession,
}