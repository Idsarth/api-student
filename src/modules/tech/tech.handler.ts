import { Request, Response, NextFunction, Router } from 'express'
import { Types } from 'mongoose'

// Import exceptions
import { HttpException, InternalServerError, NotFoundException } from '@common/exceptions'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import middlews
import { ObjectIdMiddlew, TokenMiddlew } from '@common/middlew'

// Import enums
import { HttpStatus } from '@common/enums'

// Import Dto
import { CreateTechDto, UpdateTechDto } from '@modules/tech/dto'

// Import models
import { TechnologyModel as TechModel } from '@modules/tech/models/tech.model'

// Import services
import { ResponseService } from '@common/services'

class TechHandler extends AbstractHandler {
  public path:string = '/technology'
  public router:Router = Router()
  private response = ResponseService.response

  constructor() {
    super()

    this.router.route(this.path)
      .post(this.create)
      .put(ObjectIdMiddlew.isValid('techId'), this.update)
      .get(ObjectIdMiddlew.isValid('techId'), this.getById)
      .patch(ObjectIdMiddlew.isValid('techId'), this.update)
      .delete(ObjectIdMiddlew.isValid('techId'), this.delete)

    this.router.get(`/technologies`, this.getAll)
  }

  public create = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const tech:CreateTechDto = req.body
    try {
      const check = await TechModel.findOne({ name: tech.name })
      if(check) return next(new HttpException(HttpStatus.BAD_REQUEST, `the name property already exists and must be unique.`))

      const model = await TechModel.create({ ...tech })
      const document = await model.save()

      const response = {
        ok: true,
        url: req.url,
        data: document,
        code: HttpStatus.CREATED,
        message: 'technology created successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getAll = async (req: Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      const techs = await TechModel.find().select('-__v')

      const response = {
        ok: true,
        data: techs,
        url: req.url,
        code: HttpStatus.OK,
        message: 'list of technologies gated successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getById = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const techId:string = req.query.techId as string
    try {
      const tech = await TechModel.findById({ _id: Types.ObjectId(techId) }).select('-__v')
      if(!tech) return next(new NotFoundException(`the technology with the ID ${techId} was not found.`))

      const response = {
        ok: true,
        data: tech,
        url: req.url,
        code: HttpStatus.OK,
        message: 'tech found successfully',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public update = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const techId:string = req.query.techId as string
    const tech:UpdateTechDto = req.body

    try {
      const model = await TechModel
        .findByIdAndUpdate(Types.ObjectId(techId), {
          ...tech,
          updatedAt: Date.now()
        }, {
          new: true,
          useFindAndModify: false
        })
        .select('-__v')

      if(!model) return next(new NotFoundException(`the technology with the ID ${techId} was not found.`))
      const response = {
        ok: true,
        data: model,
        url: req.url,
        code: HttpStatus.OK,
        message: 'updated technology successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public delete = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const techId:string = req.query.techId as string

    try {
      const model = await TechModel
        .findByIdAndDelete(Types.ObjectId(techId))
        .select('-__v')
      if(!model) return next(new NotFoundException(`the technology with the ID ${techId} was not found.`))

      const response = {
        ok: true,
        data: model,
        url: req.url,
        code: HttpStatus.OK,
        message: 'deleted technology successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }
}

export default new TechHandler
