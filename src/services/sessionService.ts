import {PreSessionResponse, Session} from "../interfaces/sessionInterfaces";
import { GetLatestSessionResponse, SendContactFormRequest } from "../types/services/sessionServiceTypes";
import http from "./http"
import { captureEvent } from './analyticsService'
import { EVENTS } from '../types/services/analyticsServiceTypes'

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

    captureEvent(EVENTS.SESSION_REQUESTED, {
        subject: sessionSubTopic
    })
    return data.sessionId;
}

const sendPreSesionFeedback = async (sessionId: string, payload: any): Promise<void> => {
    await http.post<{sessionId: string}>(`/api/survey/presession/${sessionId}`, {
        responseData: payload
    });
}

const getPreSessionFeedback = async (sessionId: string): Promise<PreSessionResponse> => {
    const response = await http.get(`/api/survey/presession/${sessionId}`);
    return response.data
}

const endSession = async (sessionId: string, sessionSubTopic: string): Promise<void> => {
    const { data } = await http.post('/api/session/end', {
        sessionId,
    });

    captureEvent(EVENTS.SESSION_ENDED)
    console.log('response', data)
    return data;
}

const sendContactForm = async (payload: SendContactFormRequest): Promise<void> => {
    await http.post<{sessionId: string}>(`/api-public/contact/send`, payload);
}

export const sessionService = {
    getCurrentSession,
    getLatestSession,
    endSession,
    newSession,
    sendPreSesionFeedback,
    sendContactForm,
    getPreSessionFeedback
}
