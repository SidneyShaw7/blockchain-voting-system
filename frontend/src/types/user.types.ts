export interface LoginCredentials {
  username: string;
  password: string;
  email?: string;
  rememberMe?: boolean;
  // twoFactorAuthCode?: string;
}

export interface User {
  id: string | number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// export interface LoginState {
//   isProcessing: boolean;
//   isSuccess: boolean;
//   isError: boolean;
//   data: User | null;
//   errorMessage?: string;
// }

// REGISTRATION STATE

// export interface RegistrationState {
//   isProcessing: boolean;
//   isSuccess: boolean;
//   isError: boolean;
//   errorMessage?: string;
//   data?: User | null;
// }

// REGISTRATION FORM MODEL
export interface RegistrationForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
