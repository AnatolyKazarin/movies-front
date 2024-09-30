import axios from 'axios';
import { BASE_URL } from '@/api/index';

export const signInRequest = (data: { email: string; password: string }) => axios.post(`${BASE_URL}/auth/signup`, data);
