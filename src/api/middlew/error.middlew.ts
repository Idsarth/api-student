import { Request, Response, NextFunction } from 'express'

// Import exceptions
import { HttpException } from '../exceptions'

class ErrorMiddlew {
  public error(err:HttpException, req:Request, res:Response, next:NextFunction) {
    const status = err.status || 500
    const message = err.message || 'something went wrong'

    res.status(status).json({ status, message })
  }
}

export default new ErrorMiddlew
