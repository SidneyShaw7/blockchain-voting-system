export interface AlertAction {
  type: string;
  message?: string;
}

export interface AlertState {
  type?: 'alert-success' | 'alert-danger';
  message?: string;
}