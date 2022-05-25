import Posthog from 'posthog-react-native'
import Gleap from 'react-native-gleapsdk'
import { JsonValue } from 'posthog-react-native/build/esm/bridge'
import { EVENTS } from '../types/services/analyticsServiceTypes'

export function identify(
  userId: string,
  name: string,
  email: string,
  type: string
) {
  Posthog.identify(userId, {
    name,
    email,
  })
  Gleap.setCustomData('userType', type)
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

interface UserProperties {
  userType: string
  partner?: string
}

export function registerVolunteer(volunteer: any) {
  const userProperties: UserProperties = {
    userType: 'volunteer',
  }
  if (volunteer.volunteerPartnerOrg)
    userProperties.partner = volunteer.volunteerPartnerOrg
  updateUser(userProperties as unknown as JsonValue)
  captureEvent(EVENTS.ACCOUNT_CREATED, {
    event: EVENTS.ACCOUNT_CREATED,
  })
}
