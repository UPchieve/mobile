import { UserType } from '../models/user'

const isUserType = (userType: UserType) => {
  return (currentUserType: string) => currentUserType === userType
}

export const isVolunteer = isUserType(UserType.VOLUNTEER)
export const isStudent = isUserType(UserType.STUDENT)
export const isTeacher = isUserType(UserType.TEACHER)
