export class ErrorWithStatus extends Error {
  status: number;
  errorCode: string;
  data: any;

  constructor(message: string, status = 500, errorCode = 'UNSPECIFIED_ERROR', data = {}) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor); 

    this.status = status;
    this.errorCode = errorCode;
    this.data = data;
  }
}
