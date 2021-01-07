import { measureMemory } from 'vm'
import { HttpStatus } from '../services/http-status.service'
import { HttpException } from './http.exception'

export class UnauthorizedException extends HttpException {
  constructor(message:string) {
    super(HttpStatus.UNAUTHORIZED, message)
  }
}