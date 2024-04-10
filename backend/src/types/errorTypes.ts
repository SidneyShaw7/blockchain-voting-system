export interface ErrorData {
  detail: string;
  hint?: string;
  value?: string | number | boolean;
}

export interface ErrorWithStatus extends Error {
  status?: number;
  name: string;
  message: string;
  errorCode?: string;
  data?: ErrorData; 
}
