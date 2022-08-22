//@ts-ignore
import rs from 'random-string'
import { SessionType } from '../interfaces/sessionInterfaces'
import { SessionStateChangedSocketType } from '../types/socketTypes'
/*Configuration of dayjs*/
import dayjs from 'dayjs'
import dayjsUTC from 'dayjs/plugin/utc'
import dayjsTIMEZONE from 'dayjs/plugin/timezone'
/* End configuration of dayjs */
dayjs.extend(dayjsUTC)
dayjs.extend(dayjsTIMEZONE)
export const randomString = (): string => {
  return rs()
}

export const getSessionType = (
  session: SessionStateChangedSocketType
): SessionType => {
  const documentEditorSubTopics = [
    'planning',
    'essays',
    'applications',
    'satReading',
    'humanitiesEssays',
    'reading',
    'usHistory',
  ]
  if (session && documentEditorSubTopics.includes(session.subTopic))
    return 'DOCUMENT'
  else return 'WHITEBOARD'
}

export const isSessionEnded = (
  sessionState?: SessionStateChangedSocketType
) => {
  return !!sessionState?.endedAt
}

export const delay = (time: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const hasLowerCase = (value: string) => {
  return /[a-z]/.test(value)
}

export const hasUpperCase = (value: string) => {
  return /[A-Z]/.test(value)
}

export const hasNumbers = (value: string) => {
  return /[0-9]/.test(value)
}

export const getErrorFromBackendResponse = (error: any): string => {
  const { err } = error?.response?.data ?? 'Error'
  return err
}

export const getCurrentHour = (): number => {
  return dayjs().tz('America/New_York').hour()
}
