export interface GetLatestSessionResponse {
  sessionId: string
  data: {
    id: string
    createdAt: string
    volunteerId: string
    endedByUserId: string
    endedAt: string
  }
}
export type SendContactFormTopic =
  | 'General question'
  | 'General feedback'
  | 'Technical issue'
  | 'Feature request'
  | 'Subject suggestion'
  | 'Other'
export interface SendContactFormRequest {
  userId: string
  userEmail: string
  topic: SendContactFormTopic
  message: string
}

export type SessionPhotoUploadUrl = {
  uploadUrl: string
  imageUrl: string
}
