import http from './http'
import { studentTutoringFeedback, studentCounselingFeedback } from '../types/services/feedbackServiceTypes'

export async function sendFeedback(sessionId: string, tutoring?: studentTutoringFeedback, counseling?: studentCounselingFeedback): Promise<void> {
  const res = await http.post('/api/feedback', {
    userType: 'student',
    sessionId,
    studentTutoringFeedback: tutoring,
    studentCounselingFeedback: counseling
  })
  if (res.status !== 200) {
    throw new Error(res.data.err)
  }
}
