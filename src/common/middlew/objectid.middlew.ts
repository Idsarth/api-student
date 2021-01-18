import { Request, Response, NextFunction, Handler } from 'express'
import { Types } from 'mongoose'

// Import exceptions
import { HttpException } from '@common/exceptions'

// Import enums
import { HttpStatus } from '@common/enums'

class ObjectIdMiddlew {
  private isValidObjectId = (objectId:Types.ObjectId|string): boolean => {
    return Types.ObjectId.isValid(objectId)
  }

  public isValid = (idx: Array<string>|string): Handler => {
    return (req:Request, res:Response, next:NextFunction) => {
      if(Array.isArray(idx)) {
        for (let i of idx.values()){
          if(!req.query[i]) {
            return next(new HttpException(HttpStatus.BAD_REQUEST, `the parameter ${i} cannot be empty`))
          }
          if(!this.isValidObjectId(req.query[i] as string)) {
            return next(new HttpException(HttpStatus.BAD_REQUEST, `the parameter ${i} is not a valid objectId.`))
          }
        }
      } else {
        if(!req.query[idx]) return next(new HttpException(HttpStatus.BAD_REQUEST, `the parameter ${idx} cannot be empty`))
        if(!this.isValidObjectId(req.query[idx] as string)) return next(new HttpException(HttpStatus.BAD_REQUEST, `the parameter ${idx} is not a valid objectId.`))
      }
      next()
    }
  }
}

export default new ObjectIdMiddlew()
