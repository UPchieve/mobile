import Posthog from 'posthog-react-native'
import Gleap from 'react-native-gleapsdk'
import { JsonValue } from 'posthog-react-native/build/esm/bridge'
import { Student } from '../models/user'
import { posthogConfig } from '../../config'

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

const posthog = Posthog.initAsync(posthogConfig.token, posthogConfig.settings)

export async function identify(user: Student) {
  const props = getUserPropertiesFromUser(user)
  ;(await posthog).identify(user.id, props)
  /* @ts-ignore */
  Gleap.identify(user.id, props)
  Gleap.setCustomData('userType', props.userType)
}

export async function updateUser(update: JsonValue) {
  ;(await posthog).capture('USER_UPDATED', {
    $set: update,
  })
}

export async function captureEvent(name: string, properties = {}) {
  ;(await posthog).capture(name, properties)
}

export async function reset() {
  ;(await posthog).reset()
  Gleap.clearCustomData()
  Gleap.clearIdentity()
}

function getUserPropertiesFromUser(user: Student): UserProperties {
  return {
    userType: 'student',
    createdAt: user.createdAt,
    totalSessions: user.pastSessions?.length ?? 0,
    isBanned: user.isBanned,
    isTestUser: user.isTestUser,
    gradeLevel: user.gradeLevel,
    partner: user.studentPartnerOrg,
    schoolPartner: user.isSchoolPartner ? user.highschool : undefined,
  }
}
