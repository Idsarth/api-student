import { Request, Response, NextFunction, Router } from 'express'

// Import exceptions
import { HttpException, InternalServerError } from '../../exceptions'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'
import { IResponse } from '../../interfaces'

// Import middlews
import { TokenMiddlew } from '../../middlew'
import { HttpStatus } from '../../services'

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
      if(check) next(new HttpException(HttpStatus.BAD_REQUEST, `the name or docsUrl property must be unique.`))
      else {
        const model = await TechModel.create({ ...tech })
        const document = await model.save()

        const response:IResponse = {
          data: document,
          status: {
            ok: true,
            code: HttpStatus.CREATED,
            message: 'technology created successfully.'
          },
          info: {
            url: req.url,
            datetime: new Date(Date.now()).toLocaleString()
          }
        }
        res.status(HttpStatus.CREATED).json(response)
      }
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
