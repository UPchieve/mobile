export interface Session {
    sessionId: string,
    data: {
        _id: string,
        type: string,
        subTopic: string,
        volunteerJoinedAt: Date;
        createdAt: Date;
        student: SessionUser,
        volunteer: SessionUser,
        messages: {
            _id: string;
            user: string;
            contents: string;
            createdAt: string;
        }[]
    }
}
export type SessionUser = {
    _id: string;
    firstname: string;
    isVolunteer: boolean;
    type: string;
};
export type SessionType = 'DOCUMENT' | 'WHITEBOARD';