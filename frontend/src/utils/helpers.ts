export const processError = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === 'string' ? message : 'An unknown error occurred';
  }
  return 'An unknown error occurred';
};
