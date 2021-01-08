// Import services
import { HttpStatus } from '../services/http-status.service'

import { HttpException } from './http.exception'

export class InternalServerError extends HttpException {
  constructor(message:string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message)
  }
}
