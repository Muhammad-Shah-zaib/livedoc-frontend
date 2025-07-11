import type { CredentialResponse } from "@react-oauth/google";

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  generalError: string | null;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isOauthVerified: boolean;
  isActive: boolean;
}

// AUTHENTICATION TYPES
export interface GoogleLoginPayload extends CredentialResponse {}

export interface GoogleAuthResponse {
  detail: string;
  user: IUser;
}

export interface ErrorResponse {
  message: string;
}

export interface EmailPasswordLoginPayload {
  email: string;
  password: string;
}

export interface EmailPasswordLoginResponse {
  message: string;
  user: IUser;
}
