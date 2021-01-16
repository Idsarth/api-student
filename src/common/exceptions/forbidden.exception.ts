// Import enums
import { HttpStatus } from '@common/enums'

// Import exceptions
import { HttpException } from '@common/exceptions/http.exception'

export class ForbiddenException extends HttpException {
  constructor(message:string) {
    super(HttpStatus.FORBIDDEN, message)
  }
}