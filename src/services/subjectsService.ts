import http from './http'
import { AllSubjectsWithTopics } from '../types/services/subjectsServiceTypes'

export const getSubjects = async () => {
  const { data } = await http.get<{ subjects: AllSubjectsWithTopics }>(
    '/api/subjects'
  )

  return data.subjects
}
