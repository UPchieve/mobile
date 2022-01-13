export interface Session {
    sessionId: string,
    data: {
        _id: string,
        type: string,
        subTopic: string,
        volunteerJoinedAt: Date;
        createdAt: Date;
        student: {
            _id: string;
            firstname: string;
            isVolunteer: boolean;
            type: string;
        },
        volunteer: {
            _id: string;
            firstname: string;
            isVolunteer: boolean;
            type: string;
        }
        messages: {
            _id: string;
            user: string;
            contents: string;
            createdAt: string;
        }[]
    }
}

export type SessionType = 'DOCUMENT' | 'WHITEBOARD';