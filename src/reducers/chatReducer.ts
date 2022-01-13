import { ChatIncomingData, ChatoutcomingData, ChatoutcomingData as ChatOutcomingData } from "../interfaces/chatInterfaces";
import dayjs from 'dayjs';
import { User } from "../models/user";
import { Message } from "../components/atoms/chat/ChatTypes";

interface ChatMarkSeenPayload {
    chatItem: ChatType,
}

interface ChatSessionOpenedPayload {
    userId: string,
    messages: (ChatIncomingData | ChatoutcomingData)[]
}
interface ChatIncominAction {
    type: 'chat_incoming',
    payload: ChatIncomingData
}
interface ChatOutcomingAction {
    type: 'chat_outcoming',
    payload: ChatOutcomingData
}

interface ChatAddText {
    type: 'chat_add_text',
    payload: string,
}
interface ChatSessionOpenedAction {
    type: 'chat_session_open',
    payload: ChatSessionOpenedPayload
}

interface ChatMarkSeenAction {
    type: 'chat_mark_seen',
    payload: ChatMarkSeenPayload,
}


type Action = ChatIncominAction | ChatOutcomingAction | ChatMarkSeenAction | ChatSessionOpenedAction | ChatAddText;

export interface TextItem {
    type: 'text',
    text: string,
    time: Date,
}

export interface ChatItem {
    type: 'message',
    sentByMe: boolean,
    text: string,
    time: Date,
    isVolunteer: boolean,
    lastMessage: boolean,
    user?: string,
    seen?: boolean,
}

export type ChatType = ChatItem | TextItem


export const chatReducer = (state: ChatType[] = [], action: Action): ChatType[] => {
    switch (action.type) {
        case 'chat_incoming': return handleChatIncoming(state, action.payload);
        case 'chat_outcoming': return handleChatOutcoming(state, action.payload);
        case 'chat_mark_seen': return handleChatMarkSeen(state, action.payload);
        case 'chat_session_open': return handleChatSession(state, action.payload);
        case 'chat_add_text': return handleChatAddText(state, action.payload);
    }
}

const isNewMessage = (state: ChatType[], payload: { user: string, messageDate: Date }) => {
    if (state.length > 0) {
        const previousState = state[state.length - 1];
        if (previousState.type === 'text') {
            return true;
        } else if (previousState.user === payload.user) {
            const diff = dayjs(previousState.time).diff(payload.messageDate, 'm');
            return diff !== 0;
        }
    }
    return true;
}

const handleChatOutcoming = (state: ChatType[], payload: ChatOutcomingData): ChatType[] => {
    const messageDate = new Date();
    const newMessage = isNewMessage(state, { user: payload.user, messageDate });
    const newChat: ChatItem = {
        type: 'message',
        sentByMe: true,
        isVolunteer: payload.isVolunteer,
        lastMessage: true,
        text: payload.contents,
        time: messageDate,
        user: payload.user,
    };
    if (!newMessage) {
        const penUltimate = { ...state[state.length - 1], lastMessage: false, };
        return [...state.slice(0, state.length - 1), penUltimate, newChat];
    }
    return [...state, newChat];
}

const handleChatIncoming = (state: ChatType[], payload: ChatIncomingData): ChatType[] => {
    const newMessage = isNewMessage(state, { user: payload.user, messageDate: new Date(payload.createdAt) });
    const newChat: ChatItem = {
        type: 'message',
        sentByMe: false,
        isVolunteer: payload.isVolunteer,
        lastMessage: true,
        text: payload.contents,
        time: new Date(payload.createdAt),
        user: payload.user,
        seen: payload.seen === undefined ? true : payload.seen,
    };

    if (!newMessage) {
        const penUltimate = { ...state[state.length - 1], lastMessage: false, };
        return [...state.slice(0, state.length - 1), penUltimate, newChat];
    }
    return [...state, newChat];
}

const handleChatMarkSeen = (state: ChatType[], payload: ChatMarkSeenPayload): ChatType[] => {
    console.log('marking seen..');

    return state.map(x => {
        if (x === payload.chatItem) {
            return { ...x, seen: true };
        }
        return x;
    });
}

const handleChatSession = (state: ChatType[], payload: ChatSessionOpenedPayload): ChatType[] => {
    const newState: ChatItem[] = [];
    for (let i = 0; i < payload.messages.length; i++) {
        const message = payload.messages[i];
        let newMessage = false;
        if (newState.length > 0 && newState[newState.length - 1].user === message.user) {
            const diff = dayjs(newState[newState.length - 1].time).diff(message.createdAt, 'm');
            if (diff !== 0) {
                newMessage = true;
            }
        } else {
            newMessage = true;
        }
        newState.push({
            type: 'message',
            sentByMe: payload.userId === message.user,
            isVolunteer: message.isVolunteer,
            lastMessage: true,
            text: message.contents,
            time: new Date(message.createdAt),
            seen: true,
            user: message.user,
        });
        if (!newMessage) {
            newState[i - 1] = { ...newState[i - 1], lastMessage: false };
        }
    }
    return newState;
}

const handleChatAddText = (state: ChatType[], payload: string): ChatType[] => {
    const newItem: TextItem = {
        type: 'text',
        text: payload,
        time: new Date(),
    }
    return [...state, newItem];
}
