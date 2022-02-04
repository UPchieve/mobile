import axios from 'axios';
import http from './http';
import { config } from '../../config';
import { Student, User, Volunteer } from '../models/user';
import { ConfirmValidationRequest, CreateAccountRequest, CreateAccountResponse, CreateAccountWithWithPartnerRequest, SendValidationRequest } from '../types/services/authServiceTypes';

// const login = async (
//   email: string,
//   password: string,
// ) => {
//   try {
//     const response = await axios.post(`${config.baseUrl}/auth/login`, { email, password });
//     return response.data;
//   } catch (error) {
//     console.error('Impossible to login', error);
//     throw error;
//   }
// };


const login = async (email: string, password: string): Promise<Student | Volunteer | null> => {
  const { data } = await http.post<{ user: User }>('/auth/login', { email, password });
  console.log(data);
  if (data.user) {
    return data.user.isVolunteer ? data.user as Volunteer : data.user as Student;
  }
  return null;
}

const getCurrentUser = async (): Promise<Student | Volunteer | null> => {
  const { data } = await http.get<{ user: User }>(`/api/user`);
  if (data.user) {
    return data.user.isVolunteer ? data.user as Volunteer : data.user as Student;
  }
  return null;
}

const logout = async (): Promise<void> => {
  const { data } = await http.get('/auth/logout');
  return data;
}

const sendResetPasswordEmail = async (email: string): Promise<boolean> => {
  await http.post('/auth/reset/send', {
    email
  });
  return true;
}

const changePassword = async (email: string, password: string, token: string) => {
  const { data } = await http.post('/auth/reset/confirm', {
    email,
    password,
    newpassword: password,
    token
  });
  return data;
}

const createAccount = async (request: CreateAccountRequest): Promise<CreateAccountResponse> => {
  const { data } = await http.post<CreateAccountResponse>('/auth/register/student/open', {
    ...request,
    terms: true,
  });
  return data;
}

const createAccountSendValidation = async (request: SendValidationRequest): Promise<boolean> => {
  await http.post('/api/verify/send', request);
  return true;
}

const createAccountWithPartner = async (request: CreateAccountWithWithPartnerRequest): Promise<CreateAccountResponse> => {
  const { data } = await http.post<CreateAccountResponse>('/auth/register/student/partner', request)
  return data;
}

const createAccountVerifyValidation = async (request: ConfirmValidationRequest): Promise<boolean> => {
  const { data } = await http.post<{ success: boolean }>('/api/verify/confirm', request);
  return data.success;
}

const validateSignInCode = async (partnerSignupCode: string): Promise<string> => {
  const { data } = await http.get<{ studentPartnerKey: string }>('/auth/partner/student/code', {
    params: {
      partnerSignupCode,
    }
  });
  return data.studentPartnerKey;
}

const getStudentPartnerManifest = async (partnerId: string): Promise<StudentPartnerManifest> => {
  const { data } = await http.get<{ studentPartner: StudentPartnerManifest }>('/auth/partner/student', {
    params: {
      partnerId
    }
  });
  return {
    ...data.studentPartner,
    studentPartnerOrg: partnerId,
  }
}

export const authService = {
  login,
  getCurrentUser,
  logout,
  sendResetPasswordEmail,
  changePassword,
  createAccount,
  createAccountWithPartner,
  createAccountSendValidation,
  createAccountVerifyValidation,
  validateSignInCode,
  getStudentPartnerManifest
}
