import axios from 'axios';
import http from './http';
import { config } from '../../config';
import { Student, User, Volunteer } from '../models/user';

const login = async (
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(`${config.baseUrl}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Impossible to login', error);
    throw error;
  }
};


const login2 = async (email: string, password: string): Promise<Student | Volunteer | null> => {
  const { data } = await axios.post<{ user: User }>(`${config.baseUrl}/auth/login`, { email, password });
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

export const authService = {
  login,
  login2,
  getCurrentUser,
  logout,
}