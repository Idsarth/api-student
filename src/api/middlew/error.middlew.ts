import { Request, Response, NextFunction } from 'express'

// Import exceptions
import { HttpException } from '../exceptions'

// Import interfaces
import { IResponse } from '../interfaces'

class ErrorMiddlew {
  public error(err:HttpException, req:Request, res:Response, next:NextFunction) {
    const ok = false
    const code = err.status
    const datetime = new Date(Date.now()).toLocaleString()
    const url = req.url
    const message = err.message

    const response:IResponse = {
      data: {},
      status: {
        ok,
        code,
        message
      },
      info: {
        url,
        datetime
      }
    }

    res.status(code).json(response)
  }
}

export default new ErrorMiddlew
