// Import enums
import { HttpStatus } from '@common/enums'

// Import exceptions
import { HttpException } from '@common/exceptions/http.exception'

export class InternalServerError extends HttpException {
  constructor(message:string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message)
  }
}
