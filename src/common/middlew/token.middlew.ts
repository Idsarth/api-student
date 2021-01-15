import { NextFunction, Response, Request } from 'express'
import { verify } from 'jsonwebtoken'

// Import exceptions
import { UnauthorizedException, ForbiddenException } from '../../src/common/exceptions'

// Import variables
import { SECRET_KEY } from '../../src/env'

class TokenMiddlew {
  public validated(req:Request, res:Response, next:NextFunction) {
    if(req.headers['authorization']) {
      try {
        let authorization = req.headers['authorization'].split(' ')
        if(authorization[0] !== 'Bearer') {
          throw new UnauthorizedException('not authorized.')
        } else {
          // req.user.token = verify(authorization[1], SECRET_KEY)
          return next()
        }
      } catch (err) {
        throw new ForbiddenException('forbidden.')
      }
    }else {
      throw new UnauthorizedException('not authorized.')
    }
  }
}

export default new TokenMiddlew
