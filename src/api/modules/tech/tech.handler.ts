import { Request, Response, NextFunction, Router } from 'express'

// Import exceptions
import { InternalServerError } from '../../exceptions'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '../../middlew'

// Import Dto
import { CreateTechDto } from './tech.dto'

// Import models
import { TechnologyModel as TechModel } from './tech.model'

class TechHandler extends AbstractHandler {
  public path:string = '/technology'
  public router:Router = Router()

  constructor() {
    super()

    this.router.post(this.path, this.create)
    this.router.get(this.path, this.getById)
    this.router.get(`${this.path}s`, this.getAll)
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const tech:CreateTechDto = req.body
    try {
      const check = await TechModel.findOne({ $or: [{name: tech.name}, {docsUrl: tech.docsUrl}] })
      console.log(check)

      res.end({})
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
  public async getAll(req: Request, res:Response, next:NextFunction):Promise<void> {}
  public async getById():Promise<void> {}
  public async delete():Promise<void> {}
  public async update():Promise<void> {}
}

export default new TechHandler
