import type { CredentialResponse } from "@react-oauth/google";

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  generalError: string | null;
  email_verification_required: boolean;
  errors: Record<string, string[]> | null;
  forgetPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
  initialAuthChecked: boolean;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
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
  errors?: Record<string, string[]> | null;
}

export interface EmailPasswordLoginPayload {
  email: string;
  password: string;
}

export interface EmailPasswordLoginResponse {
  message: string;
  user: IUser;
}

export interface EmailPasswordSignupPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface EmailPasswordSignupResponse {
  message: string;
  email_verification_required: boolean;
  errors: Record<string, string[]> | null;
}

export interface LogoutResponse {
  success: boolean;
}

export interface ForgetPassworPayload {
  email: string;
}
export interface ForgetPasswordResponse {
  message: string;
}

export interface ResetPasswordPayload {
  // The uid and token will be sent in the route
  uid: string;
  token: string;
  password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export type GetUserProfileResponse = IUser;
