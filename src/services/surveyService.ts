import {
  SubmitSurvey,
  SurveyQueryResponse,
} from '../types/services/surveyServiceTypes'
import http from './http'

export async function getPresessionSurvey(
  subject: string
): Promise<SurveyQueryResponse> {
  const response = await http.get(`api/survey/presession?subject=${subject}`)
  return response.data
}

export async function submitSurvey(survey: SubmitSurvey): Promise<void> {
  await http.post<{ sessionId: string }>(`/api/survey/save`, survey)
}
