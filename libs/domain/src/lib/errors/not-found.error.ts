import { BusinessError } from './business.error';

export class NotFoundError extends BusinessError {
  constructor(message: string) {
    super(message, 404);
  }
}
