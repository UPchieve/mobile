import { ChatIncomingData, ChatoutcomingData as ChatOutcomingData } from "../interfaces/chatInterfaces";
import dayjs from 'dayjs';

interface ChatIncominAction {
    type: 'chat_incoming',
    payload: ChatIncomingData
}
interface ChatOutcomingAction {
    type: 'chat_outcoming',
    payload: ChatOutcomingData
}

type Action = ChatIncominAction | ChatOutcomingAction;

export interface ChatItem {
    sentByMe: boolean,
    text: string,
    time: Date,
    isVolunteer: boolean,
    lastMessage: boolean,
    user?: string,
}

export const chatReducer = (state: ChatItem[] = [], action: Action): ChatItem[] => {
    switch (action.type) {
        case 'chat_incoming': return handleChatIncoming(state, action.payload);
        case 'chat_outcoming': return handleChatOutcoming(state, action.payload);
    }
}

const handleChatOutcoming = (state: ChatItem[], payload: ChatOutcomingData): ChatItem[] => {
    let newMessage = false;
    const messageDate = new Date();
    if (state.length > 0 && state[state.length - 1].user === payload.user) {
        const diff = dayjs(state[state.length - 1].time).diff(messageDate, 'm');
        if (diff !== 0) {
            newMessage = true;
        }
    } else {
        newMessage = true;
    }
    const newChat: ChatItem = {
        sentByMe: true,
        isVolunteer: payload.isVolunteer,
        lastMessage: true,
        text: payload.contents,
        time: messageDate,
        user: payload.user,
    }
    if (!newMessage) {
        const penUltimate = { ...state[state.length - 1], lastMessage: false, };
        return [...state.slice(0, state.length - 1), penUltimate, newChat];
    }
    return [...state, newChat];
}

const handleChatIncoming = (state: ChatItem[], payload: ChatIncomingData): ChatItem[] => {
    let newMessage = false;
    //check if the last message is from the same person.
    if (state.length > 0 && state[state.length - 1].user === payload.user) {
        //check dates
        const diff = dayjs(state[state.length - 1].time).diff(payload.createdAt, 'm');
        if (diff !== 0) {
            newMessage = true;
        }
    } else {
        newMessage = true;
    }
    const newChat: ChatItem = {
        sentByMe: false,
        isVolunteer: payload.isVolunteer,
        lastMessage: true,
        text: payload.contents,
        time: new Date(payload.createdAt),
        user: payload.user,
    };
    if (!newMessage) {
        const penUltimate = { ...state[state.length - 1], lastMessage: false, };
        return [...state.slice(0, state.length - 1), penUltimate, newChat];
    }
    return [...state, newChat];
}