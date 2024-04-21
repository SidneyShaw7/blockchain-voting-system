// export interface AlertAction {
//   type: string;
//   message?: string;
// }

export interface AlertState {
  type?: 'success' | 'error' | 'info' | 'warning';
  message?: string;
}