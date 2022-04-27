import * as ImagePicker from 'expo-image-picker';

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

export type PreSessionResponse = {
    survey: {
        _id: string,
        session: string,
        surveyType: string,
        user: string,
        __v: number,
        createdAt: string,
        responseData: {
            "primary-goal": {
                answer: string
            },
            "topic-understanding": {
                answer: number
            }
        }
    }
}

export type SessionType = 'DOCUMENT' | 'WHITEBOARD';

export type SessionSubjectType = 'math' | 'science' | 'college' | 'sat' | 'training' | 'readingWriting';

export type ImagePickerInfo = ImagePicker.ImagePickerResult & { cancelled?: false };