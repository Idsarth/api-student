import { Request, Response, NextFunction, Router } from 'express'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '../../middlew'

class TechHandler extends AbstractHandler {
  public path:string = '/technology'
  public router:Router = Router()

  constructor() {
    super()

    this.router.use(TokenMiddlew.validated)
      .route(this.path)
      .get(this.getAll)
      .put(this.update)
      .get(this.getById)
      .post(this.create)
      .delete(this.delete)
  }

  public async getById():Promise<void> {}
  public async getAll(req: Request, res:Response, next:NextFunction):Promise<void> {
    res.status(200).json({ technologies: [] }).end()
  }
  public async create():Promise<void> {}
  public async delete():Promise<void> {}
  public async update():Promise<void> {}
}

export default new TechHandler
