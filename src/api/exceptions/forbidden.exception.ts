import { HttpStatus } from '../services/http-status.service'
import { HttpException } from './http.exception'

export class ForbiddenException extends HttpException {
  constructor(message:string) {
    super(HttpStatus.FORBIDDEN, message)
  }
}