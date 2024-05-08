import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

//  instance of axios with default properties
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// handle global request or response transformations or logging, here:
api.interceptors.request.use((request) => {
//   console.log('Starting Request', request);
  return request;
});

// Response Interceptor for handling global errors
api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx will trigger this function
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      // Server responded with a status code outside the range of 2xx
      console.error(`API Error: ${error.response.status} - ${error.response.data.message}`);

      // Example: Handle 401 Unauthorized globally
      if (error.response.status === 401) {
        // Possibly redirect to login page or refresh auth tokens
        console.warn('You are not authorized. Please login again.');
      }

      // Example: Handle 500 Internal Server Error globally
      if (error.response.status === 500) {
        console.error('A server error occurred. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response: ', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error: ', error.message);
    }

    // You can forward the error to your application's error handling system here
    return Promise.reject(error);
  }
);

export default api;
