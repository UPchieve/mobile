import http from './http'
import { backOff } from 'exponential-backoff'

const getSchools = async (q: string): Promise<School[]> => {
  const { data } = await http.get<{ results: School[] }>(
    '/api-public/eligibility/school/search',
    {
      params: {
        q,
      },
    }
  )
  return data?.results || []
}

const check = async (request: CheckEligibilityRequest): Promise<boolean> => {
  const { data } = await http.post<{ isEligible?: boolean }>(
    '/api-public/eligibility/check',
    request
  )
  const { isEligible } = data
  return isEligible !== undefined ? isEligible : true
}

const getStudentSignupSources = async (): Promise<
  StudentSignupSource[] | undefined
> => {
  try {
    const { data } = await backOff(() =>
      http.get('/api-public/eligibility/signup-sources/students')
    )
    const { signupSources } = data
    return signupSources
  } catch (error) {
    alert('We had a problem loading options for "How did you hear about us?"')
  }
}

export const eligibilityService = { getSchools, check, getStudentSignupSources }
