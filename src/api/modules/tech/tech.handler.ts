import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

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
    this.router.get(`/technologies`, this.getAll)
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
  public async getAll(req: Request, res:Response, next:NextFunction):Promise<void> {
    try {
      const techs = await TechModel.find()
        .populate({
          path: 'courses',
          populate: {
            path: 'tasks'
          }
        })
        .select('-__v')
      
      const response:IResponse = {
        data: techs,
        status: {
          ok: true,
          code: HttpStatus.OK,
          message: 'list of technologies gated successfully.'
        },
        info: {
          url: req.url,
          datetime: new Date(Date.now()).toLocaleString()
        }
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      next(new InternalServerError('internal server error'))
    }
  }
  public async getById(req:Request, res:Response, next:NextFunction):Promise<void> {
    const techId:string = req.query.techId as string
    if(!isValidObjectId(techId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param techId is not valid.'))
    const tech = await TechModel.findById({ _id: Types.ObjectId(techId) })
      .populate({
        path: 'courses',
        populate: {
          path: 'tasks'
        }
      })
      .select('-__v')
    const response:IResponse = {
      data: tech,
      status: {
        ok: true,
        code: HttpStatus.OK,
        message: 'tech found successfully'
      },
      info: {
        url: req.url,
        datetime: new Date(Date.now()).toLocaleString()
      }
    }
    res.status(HttpStatus.OK).json(response)
  }
  public async delete():Promise<void> {}
  public async update():Promise<void> {}
}

export default new TechHandler
