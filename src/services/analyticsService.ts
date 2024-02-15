import Posthog from 'posthog-react-native'
import Gleap from 'react-native-gleapsdk'
import { JsonValue } from 'posthog-react-native/build/esm/bridge'
import { Student } from '../models/user'

type UserProperties = {
  userType: 'student' | 'volunteer'
  createdAt: string
  totalSessions: number
  isBanned: boolean
  isTestUser: boolean
  gradeLevel?: string
  partner?: string
  schoolPartner?: string
}

export function identify(user: Student) {
  const props = getUserPropertiesFromUser(user)
  Posthog.identify(user.id, props)
  /* @ts-ignore */
  Gleap.identify(user.id, props)
  Gleap.setCustomData('userType', props.userType)
}

export function updateUser(update: JsonValue) {
  Posthog.capture('USER_UPDATED', {
    $set: update,
  })
}

export function captureEvent(name: string, properties?: JsonValue) {
  if (properties) {
    Posthog.capture(name, {
      $set: properties,
    })
  } else {
    Posthog.capture(name)
  }
}

export function reset() {
  Posthog.reset()
  Gleap.clearCustomData()
  Gleap.clearIdentity()
}

function getUserPropertiesFromUser(user: Student): UserProperties {
  return {
    userType: 'student',
    createdAt: user.createdAt.toISOString(),
    totalSessions: user.pastSessions?.length ?? 0,
    isBanned: user.isBanned,
    isTestUser: user.isTestUser,
    gradeLevel: user.gradeLevel,
    partner: user.studentPartnerOrg,
    schoolPartner: user.isSchoolPartner ? user.highschool : undefined,
  }
}
