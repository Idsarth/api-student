import { Response, Request, Router } from 'express'

// Import handlers
import { Handler } from '../../interfaces'

class AuthHandler implements Handler {
  public path: string = '/auth'
  public router = Router()

  constructor() {}

  public signIn(req: Request, res: Response):void {}
}

export default new AuthHandler
