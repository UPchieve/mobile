import { useEffect, useState } from "react";
import { User } from "../models/user";
import { sessionService } from "../services/sessionService";
import { SessionStateChangedSocketType } from "../types/socketTypes";


export type userStateType = 'in_session' | 'banned' | 'waiting'
export type useUserStateType = {
    userState?: userStateType;
    currentSessionId?: string;
    lastSessionDate?: Date;
    refreshUserState: () => Promise<userStateType | undefined>;
}

export const useUserState = (user?: User, sessionState?: SessionStateChangedSocketType): useUserStateType => {

    const [currentSessionId, setCurrentSessionId] = useState<string>();
    const [lastSessionDate, setLastSessionDate] = useState<Date>();

    const [userState, setUserState] = useState<userStateType | undefined>(undefined);

    const getCurrentSession = async (): Promise<string | undefined> => {
        try {
            const currentSession = await sessionService.getCurrentSession();
            return currentSession?.sessionId;
        } catch (error) {
        }
    }

    const getLatestSessionDate = async (): Promise<string | undefined> => {
        try {
            const latestSession = await sessionService.getLatestSession(user!._id);
            console.log('latest', latestSession)
            return latestSession?.data?.createdAt;
        } catch (err) {
            console.log('exception', err)
        }
    }

    const refreshUserState = async (): Promise<userStateType | undefined> => {
        let state: userStateType | undefined = undefined;
        if (user?.isBanned) {
            state = 'banned';
        } else {
            const currentSession = await getCurrentSession();
            if (currentSession) {
                state = 'in_session';
                setCurrentSessionId(currentSession);
            } else {
                const latestSessionDate = await getLatestSessionDate();
                if (latestSessionDate) {
                    const sessionCreatedAtInMS = new Date(latestSessionDate).getTime();
                    const currentDateInMS = new Date().getTime()
                    const minutes = (Math.ceil(currentDateInMS - sessionCreatedAtInMS) / 60000);
                    if (minutes < 5) {
                        setLastSessionDate(new Date(latestSessionDate));
                        state = 'waiting';
                    }
                }
            }
        }
        setUserState(state);
        return state;
    }

    return {
        userState: userState,
        currentSessionId: currentSessionId,
        lastSessionDate,
        refreshUserState,
    };
};