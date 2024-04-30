export interface AsyncState<T> {
  isProcessing: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  data?: T | null;
}
