import type { CredentialResponse } from "@react-oauth/google";
// import type { IUser } from "./types";

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
  foundUser: IUser | null;
  findingUser: boolean;
  errorFindingUser: string | null;
  registeredUsers: IUser[] | null;
  loadingRegisteredUsers: boolean;
  errorRegisteredUsers: string | null;
  liveblocksToken: string | null;
  loadingLiveblocksToken: boolean;
  errorLiveblocksToken: string | null;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  isOauthVerified: boolean;
  isActive: boolean;
}

export interface GoogleLoginPayload extends CredentialResponse { }

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
  user: IUser;
  errors: Record<string, string[]> | null;
}

export interface LogoutResponse {
  success: boolean;
}

export type GetUserProfileResponse = IUser;

export interface GetUserByEmailPayload {
  email: string;
}

export interface GetUserByEmailResponse {
  user: IUser;
  detail: string;
}

export interface UpdateUserProfileRequest {
  first_name: string;
  last_name: string;
}

export interface UpdateUserProfileResponse {
  message: string;
  user: IUser;
  errors: Record<string, string[]> | null;
}

export interface GetAllUsersResponse {
  users: IUser[];
  detail: string;
}

export interface LiveblocksAuthPayload {
  roomId: string;
}

export interface LiveblocksAuthResponse {
  token: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  uid: string;
  token: string;
  password: string;
  confirm_password: string;
}

export interface PasswordResetResponse {
  detail: string;
}
