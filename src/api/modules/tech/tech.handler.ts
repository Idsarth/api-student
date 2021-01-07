import { Request, Response, NextFunction, Router } from 'express'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

class TechHandler extends AbstractHandler {
  public path:string = '/technology'
  public router:Router = Router()

  constructor() {
    super()

    this.router.get(`${this.path}`, this.getAll)
    this.router.get(`${this.path}/:id`, this.getById)

    this.router
      .all(`${this.path}/*`)
      .put(this.path, this.update)
      .post(this.path, this.create)
      .delete(this.path, this.delete)
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
