import axios from 'axios';

export const processError = (error: unknown): string => {
  // Handling Axios errors
  if (axios.isAxiosError(error)) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response) {
      // Specific error message from server
      return error.response.data.message || error.response.statusText || 'An unknown error occurred';
    } else if (error.request) {
      // The request was made but no response was received
      return 'The server did not respond.';
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }

  // Handling non-Axios errors
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === 'string' ? message : 'An unknown error occurred';
  }

  return 'An unknown error occurred';
};
