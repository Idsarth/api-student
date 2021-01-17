import { Request, Response, NextFunction } from 'express'

// Import exceptions
import { HttpException } from '@common/exceptions'

// Import services
import { ResponseService } from '@common/services'

class ErrorMiddlew {
  private response = ResponseService.response

  public error = (err:HttpException, req:Request, res:Response, _:NextFunction):void => {
    const ok = false
    const url = req.url
    const code = err.status
    const message = err.message

    const response = {
      ok,
      url,
      code,
      message,
      data: {},
    }
    res.status(response.code).json(this.response(response))
  }
}

export default new ErrorMiddlew()
