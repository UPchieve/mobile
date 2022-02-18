import { Session } from "../interfaces/sessionInterfaces";
import { GetLatestSessionResponse } from "../types/services/sessionServiceTypes";
import http from "./http"

const getCurrentSession = async (): Promise<Session> => {
    const response = await http.post<Session>('/api/session/current');
    return response.data;
}

const getLatestSession = async (userId: string,): Promise<GetLatestSessionResponse> => {
    const response = await http.post<GetLatestSessionResponse>('/api/session/latest', {userId});
    return response.data;
}

const newSession = async (sessionType: string, sessionSubTopic: string): Promise<string> => {

    const { data } = await http.post<{sessionId: string}>('/api/session/new', {
        sessionType, sessionSubTopic
    });
    return data.sessionId;
}

const sendPreSesionFeedback = async (sessionId: string, payload: any): Promise<void> => {
    await http.post<{sessionId: string}>(`/api/survey/presession/${sessionId}`, payload);
}

const getPreSessionFeedback = async (sessionId: string): Promise<void> => {
    await http.get<{sessionId:string}>(`/api/survey/presession/${sessionId}`);
}

const endSession = async (sessionId: string): Promise<void> => {
    console.log('execurted');
    const { data } = await http.post('/api/session/end', {
        sessionId,
    });
    return data;
}

export const sessionService = {
    getCurrentSession,
    getLatestSession,
    endSession,
    newSession,
    sendPreSesionFeedback
}
