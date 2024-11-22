// api/authApi.ts
import axios from 'axios';
import { AuthResponse, LoginCredentials, User } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Register user API call
export const registerUser = async (userData: User): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/users/register`, userData);
  return response.data;
};

// Login user API call
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/users/login`, credentials);
  return response.data;
};
