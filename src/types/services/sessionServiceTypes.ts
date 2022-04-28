export interface GetLatestSessionResponse {
    sessionId: string,
    data: {
        _id: string,
        createdAt: string,
    }
}
export type SendContactFormTopic = 'General question' | 'General feedback' | 'Technical issue' | 'Feature request' | 'Subject suggestion' | 'Other';
export interface SendContactFormRequest {
    userId: string,
    userEmail: string,
    topic:SendContactFormTopic,
    message: string,
}

export type SessionPhotoUploadUrl = {
    uploadUrl: string
    imageUrl: string
}