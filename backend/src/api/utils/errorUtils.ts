import { ErrorWithStatus } from '../types';

// export function createError(
//   name: string,
//   message: string,
//   status: number,
//   errorCode: string = 'GENERIC',
//   data: ErrorData
// ): ErrorWithStatus {
//   const error: ErrorWithStatus = {
//     name,
//     message,
//     status,
//     errorCode,
//     data,
//     stack: new Error().stack,
//   };
//   return error;
// }

export function logError(error: ErrorWithStatus) {
  if (error.data && typeof error.data === 'object' && 'userId' in error.data) {
    console.log(`Error for user ${error.data.userId}: ${error.message}`);
  } else {
    console.log(`General error: ${error.message}`);
  }
}
