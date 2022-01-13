//@ts-ignore
import rs from 'random-string';
import { Session, SessionType } from '../interfaces/sessionInterfaces';
import { SessionStateChangedSocketType } from '../types/socketTypes';
export const randomString = (): string => {
    return rs();
}

export const getSessionType = (session: Session): SessionType => {
    const documentEditorSubTopics = [
        'planning',
        'essays',
        'applications',
        'satReading',
        'humanitiesEssays'
    ]
    if (session && documentEditorSubTopics.includes(session.data.subTopic))
        return 'DOCUMENT'
    else return 'WHITEBOARD'
}

export const isSessionEnded = (sessionState?: SessionStateChangedSocketType) => {
    return !!sessionState?.endedAt;
}

export const delay = (time: number): Promise<void> => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}