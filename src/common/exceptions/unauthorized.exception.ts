import { measureMemory } from 'vm'
import { HttpStatus } from '../enums/http-status.enum'
import { HttpException } from './http.exception'

export class UnauthorizedException extends HttpException {
  constructor(message:string) {
    super(HttpStatus.UNAUTHORIZED, message)
  }
}