export interface LoginCredentials {
  username?: string;
  // usernameOrEmail: string;
  password: string;
  email?: string;
  rememberMe?: boolean;
  // twoFactorAuthCode?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// auth response

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// REGISTRATION FORM MODEL
export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
