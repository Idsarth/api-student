import { HttpStatus } from '../enums/http-status.enum'
import { HttpException } from './http.exception'

export class ForbiddenException extends HttpException {
  constructor(message:string) {
    super(HttpStatus.FORBIDDEN, message)
  }
}