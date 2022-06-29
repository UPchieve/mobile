interface rateSession {
  rating?: number
}

interface coachRatings {
  'coach-knowledgable'?: number
  'coach-friendly'?: number
  'coach-help-again'?: number
}

export interface studentTutoringFeedback {
  'session-goal'?: number
  'subject-understanding'?: number
  'coach-rating'?: number
  'coach-feedback'?: string
  'other-feedback'?: string
}

export interface studentCounselingFeedback {
  'rate-session'?: rateSession
  'session-goal'?: string
  'coach-ratings'?: coachRatings
  'other-feedback'?: string
}

export interface sendFeedbackRequest {
  sessionId: string
  userType: string
  studentTutoringFeedback?: studentTutoringFeedback
  studentCounselingFeedback?: studentCounselingFeedback
}
