import { User } from "../models/user"

export type SessionStateChangedSocketType = {
    _id: string,
    createdAt: string,
    endedAt?: string,
    endedBy?: string,
    failedJoins: [],
    flags: [],
    isReported: boolean,
    isStudentBanned: boolean,
    student: User,
    type: "math",
    subTopic: string,
    toReview: false,
    volunteer?: User
    volunteerJoinedAt: string
}