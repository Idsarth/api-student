import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

// Import exceptions
import { HttpException, InternalServerError, NotFoundException } from '@common/exceptions'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '@common/middlew'

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

    this.router.post(this.path, this.create.bind(this))
    this.router.get(this.path, this.getById.bind(this))
    this.router.get(`/technologies`, this.getAll.bind(this))
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const tech:CreateTechDto = req.body
    try {
      const check = await TechModel.findOne({ name: tech.name })
      if(check) next(new HttpException(HttpStatus.BAD_REQUEST, `the name property already exists and must be unique.`))

      const model = await TechModel.create({ ...tech })
      const document = await model.save()

      const response = {
        data: document,
        ok: true,
        code: HttpStatus.CREATED,
        message: 'technology created successfully.',
        url: req.url
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async getAll(req: Request, res:Response, next:NextFunction):Promise<void> {
    try {
      const techs = await TechModel.find().select('-__v')

      const response = {
        data: techs,
        ok: true,
        code: HttpStatus.OK,
        message: 'list of technologies gated successfully.',
        url: req.url,
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async getById(req:Request, res:Response, next:NextFunction):Promise<void> {
    const techId:string = req.query.techId as string
    try {
      if(!isValidObjectId(techId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param techId is not valid.'))

      const tech = await TechModel.findById({ _id: Types.ObjectId(techId) }).select('-__v')
      const response = {
        data: tech,
        ok: true,
        code: HttpStatus.OK,
        message: 'tech found successfully',
        url: req.url,
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async update(req:Request, res:Response, next:NextFunction):Promise<void> {
    const techId:string = req.query.techId as string
    const tech:UpdateTechDto = req.body

    try {
      if(!isValidObjectId(techId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param techId is not valid.'))

      const model = await TechModel.findByIdAndUpdate(techId, { ...tech, updatedAt: Date.now() }, { new: true, useFindAndModify: false }).select('-__v')
      if(!model) next(new NotFoundException(`the technology with the ID ${techId} was not found.`))

      const response = {
        data: model,
        ok: true,
        code: HttpStatus.OK,
        message: 'updated technology successfully.',
        url: req.url
      }

      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async delete(req:Request, res:Response, next:NextFunction):Promise<void> {
    const techId:string = req.query.techId as string

    try {
      if(!isValidObjectId(techId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param techId is not valid.'))

      const model = await TechModel.findByIdAndDelete(techId, { new: true, useFindAndModify: false }).select('-__v')
      if(!model) next(new NotFoundException(`the technology with the ID ${techId} was not found.`))

      const response = {
        data: model,
        ok: true,
        code: HttpStatus.OK,
        message: 'deleted technology successfully.',
        url: req.url
      }

      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }
}

export default new TechHandler
