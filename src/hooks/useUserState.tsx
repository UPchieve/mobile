import { useState } from 'react'
import { User } from '../models/user'
import { sessionService } from '../services/sessionService'
import { SessionStateChangedSocketType } from '../types/socketTypes'
import { GetLatestSessionResponse } from '../types/services/sessionServiceTypes'

const SESSION_REQUEST_COOLDOWN_MS = 1000 * 60 * 5 // 5 minutes

export type userStateType = 'in_session' | 'banned' | 'waiting'
export type useUserStateType = {
  userState?: userStateType
  currentSessionId?: string
  lastSessionDate?: Date
  refreshUserState: () => Promise<userStateType | undefined>
}

export const useUserState = (
  user?: User,
  sessionState?: SessionStateChangedSocketType
): useUserStateType => {
  const [currentSessionId, setCurrentSessionId] = useState<string>()
  const [lastSessionDate, setLastSessionDate] = useState<Date>()

  const [userState, setUserState] = useState<userStateType | undefined>(
    undefined
  )

  const getCurrentSession = async (): Promise<string | undefined> => {
    try {
      const currentSession = await sessionService.getCurrentSession()
      return currentSession?.sessionId
    } catch (error) {}
  }

  const getLatestSession = async (): Promise<
    GetLatestSessionResponse['data'] | undefined
  > => {
    try {
      const latestSession = await sessionService.getLatestSession(user!.id)
      return latestSession?.data
    } catch (err) {
      console.log('exception', err)
    }
  }

  const calculateCoolDown = (
    latestSession: GetLatestSessionResponse['data']
  ): number => {
    const hasNoLatestSession = !latestSession
    const isSessionOngoing = !latestSession?.endedAt
    const wasSessionEndedByVolunteer =
      !!latestSession?.volunteerId &&
      !!latestSession?.endedByUserId &&
      latestSession?.volunteerId === latestSession?.endedByUserId
    if (hasNoLatestSession || isSessionOngoing || wasSessionEndedByVolunteer) {
      return 0
    }

    const sessionCreatedAtMs = new Date(latestSession.createdAt).getTime()
    const currentTimeMs = new Date().getTime()
    const timeSinceLastSessionStartedMs = currentTimeMs - sessionCreatedAtMs
    if (timeSinceLastSessionStartedMs >= SESSION_REQUEST_COOLDOWN_MS) return 0

    const diffInMs = SESSION_REQUEST_COOLDOWN_MS - timeSinceLastSessionStartedMs
    return Math.ceil(Math.max(0, diffInMs / 60000))
  }

  const refreshUserState = async (): Promise<userStateType | undefined> => {
    let state: userStateType | undefined = undefined
    if (user?.isBanned) {
      state = 'banned'
    } else {
      const currentSession = await getCurrentSession()
      if (currentSession) {
        state = 'in_session'
        setCurrentSessionId(currentSession)
      } else {
        const latestSession = await getLatestSession()

        if (latestSession) {
          const coolDown = calculateCoolDown(latestSession)
          if (coolDown > 0) {
            setLastSessionDate(new Date(latestSession.endedAt))
            state = 'waiting'
          }
        }
      }
    }
    setUserState(state)
    return state
  }

  return {
    userState: userState,
    currentSessionId: currentSessionId,
    lastSessionDate,
    refreshUserState,
  }
}
