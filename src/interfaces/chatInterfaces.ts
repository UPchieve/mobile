export interface ChatIncomingData{
    contents: string,
    createdAt: string,
    isVolunteer: boolean,
    user: string,
    seen?: boolean,
}

export interface ChatoutcomingData {
    contents: string,
    isVolunteer: boolean,
    createdAt: string,
    user: string,
}