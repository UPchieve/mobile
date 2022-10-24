import { Session } from '../interfaces/sessionInterfaces'
import {
  GetLatestSessionResponse,
  SendContactFormRequest,
  SessionPhotoUploadUrl,
} from '../types/services/sessionServiceTypes'
import http from './http'
import { captureEvent } from './analyticsService'
import { EVENTS } from '../types/services/analyticsServiceTypes'
import { SurveyQueryResponse } from '../types/services/surveyServiceTypes'

const getCurrentSession = async (): Promise<Session> => {
  const response = await http.post<Session>('/api/session/current')
  return response.data
}

const getLatestSession = async (
  userId: string
): Promise<GetLatestSessionResponse> => {
  const response = await http.post<GetLatestSessionResponse>(
    '/api/session/latest',
    { userId }
  )
  return response.data
}

const newSession = async (
  sessionType: string,
  sessionSubTopic: string
): Promise<string> => {
  const { data } = await http.post<{ sessionId: string }>('/api/session/new', {
    sessionType,
    sessionSubTopic,
  })

  captureEvent(EVENTS.SESSION_REQUESTED, {
    subject: sessionSubTopic,
  })
  return data.sessionId
}

const sendPreSesionFeedback = async (
  sessionId: string,
  payload: any
): Promise<void> => {
  await http.post<{ sessionId: string }>(
    `/api/survey/presession/${sessionId}`,
    {
      responseData: payload,
    }
  )
}

const getPreSessionGoal = async (sessionId: string): Promise<string> => {
  const response = await http.get(`/api/survey/presession/${sessionId}/goal`)
  return response.data.goal
}

const getPostsessionSurveyDefinition = async (
  sessionId: string
): Promise<SurveyQueryResponse> => {
  const response = await http.get(
    `api/survey/postsession?sessionId=${sessionId}&role=student`
  )
  return response.data.survey
}

const endSession = async (
  sessionId: string,
  sessionSubTopic: string
): Promise<void> => {
  const { data } = await http.post('/api/session/end', {
    sessionId,
  })

  captureEvent(EVENTS.SESSION_ENDED)
  console.log('response', data)
  return data
}

const sendContactForm = async (
  payload: SendContactFormRequest
): Promise<void> => {
  await http.post<{ sessionId: string }>(`/api-public/contact/send`, payload)
}

const getSessionPhotoUploadUrl = async (
  sessionId: string
): Promise<SessionPhotoUploadUrl> => {
  const response = await http.get(`api/session/${sessionId}/photo-url`)
  return response.data
}

// TODO: replace use of `fetch` with `rn-fetch-blob`
const uploadSessionPhotoToStorage = async (
  url: string,
  fileUri: string,
  fileType: string,
  data: any
): Promise<void> => {
  // using native fetch because there are issues with Axios and
  // React Native with uploading a file with form data
  await fetch(url, {
    method: 'put',
    body: data,
    headers: {
      'Content-Type': fileType,
    },
  })
}

export const sessionService = {
  getCurrentSession,
  getLatestSession,
  getPostsessionSurveyDefinition,
  endSession,
  newSession,
  sendPreSesionFeedback,
  sendContactForm,
  getPreSessionGoal,
  getSessionPhotoUploadUrl,
  uploadSessionPhotoToStorage,
}
