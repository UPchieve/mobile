export interface GetLatestSessionResponse {
    sessionId: string,
    data: {
        _id: string,
        createdAt: string,
    }
}