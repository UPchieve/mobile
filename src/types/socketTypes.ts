import { SessionSubjectType } from '../interfaces/sessionInterfaces'
import { User } from '../models/user'

export type SessionStateChangedSocketType = {
  _id: string
  id: string
  createdAt: string
  endedAt?: string
  endedBy?: string
  failedJoins: []
  messages: SessionMessage[]
  flags: []
  isReported: boolean
  isStudentBanned: boolean
  student: User
  type: SessionSubjectType
  subTopic: string
  toReview: false
  volunteer?: User
  volunteerJoinedAt?: string
}

export interface SessionMessage {
  _id: string
  id: string
  user: string
  contents: string
  createdAt: string
}
