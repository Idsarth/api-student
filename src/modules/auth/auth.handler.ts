import { Response, Request, Router } from 'express'

// Import handlers
import { IHandler } from '@common/interfaces'

class AuthHandler implements IHandler {
  public path: string = '/auth'
  public router = Router()

  constructor() {}

  public signIn(req: Request, res: Response):void {}
}

export default new AuthHandler
