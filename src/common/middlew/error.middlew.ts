import { Request, Response, NextFunction } from 'express'

// Import exceptions
import { HttpException } from '@common/exceptions'

// Import services
import { ResponseService } from '@common/services'

class ErrorMiddlew {
  private response = ResponseService.response

  public error(err:HttpException, req:Request, res:Response, next:NextFunction) {
    const ok = false
    const code = err.status
    const url = req.url
    const message = err.message

    const response = {
      data: {},
      ok,
      code,
      message,
      url,
    }

    res.status(code).json(this.response(response))
  }
}

export default new ErrorMiddlew
