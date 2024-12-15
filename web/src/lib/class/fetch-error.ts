/**
 * This class extends from the Error class to create a custom error object that includes the status code, timestamp, and error message.
 */
export class FetchError extends Error {
  status: number;
  name: string;
  timestamp: Date;
  error: string;

  constructor(name: string, error: string, status: number) {
    super(error);

    this.name = 'FetchError';
    this.status = status;
    this.name = name;
    this.timestamp = new Date();
    this.error = error;
  }
}
