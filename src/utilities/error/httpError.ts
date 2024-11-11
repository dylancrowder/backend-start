export class HttpError extends Error {
  public statusCode: number;
  public generalError: any;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, generalError: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.generalError = generalError;
    this.isOperational = true; 
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}