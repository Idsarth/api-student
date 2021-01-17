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
      let isValid:boolean
      if(Array.isArray(idx)) {
        isValid = idx.every((id:string) => this.isValidObjectId(req.query[id] as string))
      } else {
        isValid = this.isValidObjectId(req.query[idx] as string)
      }
      if(!isValid) {
        next(new HttpException(HttpStatus.BAD_REQUEST, 'the parameter is not a valid objectId.'))
      }
      next()
    }
  }
}

export  default  new ObjectIdMiddlew()
