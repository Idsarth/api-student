// Import enums
import { HttpStatus } from '@common/enums'

// Import exceptions
import { HttpException } from '@common/exceptions/http.exception'

export class NotFoundException extends HttpException {
  constructor(message:string) {
    super(HttpStatus.NOT_FOUND, message)
  }
}