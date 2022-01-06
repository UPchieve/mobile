import { ChatIncomingData, ChatoutcomingData, ChatoutcomingData as ChatOutcomingData } from "../interfaces/chatInterfaces";
import dayjs from 'dayjs';
import { User } from "../models/user";
import { Message } from "../components/atoms/chat/ChatTypes";

interface ChatMarkSeenPayload {
    chatItem: ChatItem,
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

interface ChatSessionOpenedAction {
    type: 'chat_session_open',
    payload: ChatSessionOpenedPayload
}

interface ChatMarkSeenAction {
    type: 'chat_mark_seen',
    payload: ChatMarkSeenPayload,
}


type Action = ChatIncominAction | ChatOutcomingAction | ChatMarkSeenAction | ChatSessionOpenedAction;

export interface ChatItem {
    sentByMe: boolean,
    text: string,
    time: Date,
    isVolunteer: boolean,
    lastMessage: boolean,
    user?: string,
    seen?: boolean,
}

export const chatReducer = (state: ChatItem[] = [], action: Action): ChatItem[] => {
    switch (action.type) {
        case 'chat_incoming': return handleChatIncoming(state, action.payload);
        case 'chat_outcoming': return handleChatOutcoming(state, action.payload);
        case 'chat_mark_seen': return handleChatMarkSeen(state, action.payload);
        case 'chat_session_open': return handleChatSession(state, action.payload);
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
        seen: payload.seen === undefined ? true : payload.seen,
    };
    if (!newMessage) {
        const penUltimate = { ...state[state.length - 1], lastMessage: false, };
        return [...state.slice(0, state.length - 1), penUltimate, newChat];
    }
    return [...state, newChat];
}

const handleChatMarkSeen = (state: ChatItem[], payload: ChatMarkSeenPayload): ChatItem[] => {
    return state.map(x => {
        if (x === payload.chatItem) {
            return { ...x, seen: true };
        }
        return x;
    });
}

const handleChatSession = (state: ChatItem[], payload: ChatSessionOpenedPayload): ChatItem[] => {
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