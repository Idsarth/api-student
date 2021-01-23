import { Request, Response, NextFunction, Router } from 'express'
import { Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import middlews
import { TokenMiddlew, ObjectIdMiddlew } from '@common/middlew'

// Import enums
import { HttpStatus } from '@common/enums'

// Import dto
import { CreateTopicDto, UpdateTopicDto } from '@modules/topic/dto'

// Import model
import { TopicModel } from '@modules/topic/models/topic.model'
import { TechnologyModel as TechModel } from '@modules/tech/models/tech.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '@common/exceptions'

// Import interfaces
import { ResponseService } from '@common/services'

class TopicHandler extends AbstractHandler {
  public path:string = '/topic'
  public router:Router = Router()
  private response = ResponseService.response

  constructor() {
    super()

    this.router.route(this.path)
      .post(this.create)
      .put(ObjectIdMiddlew.isValid('topicId'), this.update)
      .get(ObjectIdMiddlew.isValid('topicId'), this.getById)
      .patch(ObjectIdMiddlew.isValid('topicId'), this.update)
      .delete(ObjectIdMiddlew.isValid('topicId'), this.delete)

    this.router.get(`${this.path}s`, this.getAll)
    this.router.post(`${this.path}/tech`, ObjectIdMiddlew.isValid(['techId', 'topicId']), this.addTopicToTech)
    this.router.get(`${this.path}/tech`, ObjectIdMiddlew.isValid('techId'), this.getTopicByTechId)
  }

  public create = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const topic:CreateTopicDto = req.body

    try {
      const check = await TopicModel.findOne({ name: topic.name })
      if(check) return next(new HttpException(HttpStatus.BAD_REQUEST, `the name property already exits and must be unique.`))

      const model = await TopicModel.create({ ...topic })
      const document = await model.save()

      const response = {
        ok: true,
        url: req.url,
        data: document,
        code: HttpStatus.CREATED,
        message: 'created topic successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getById = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const topicId:string = req.query.topicId as string
    try {
      const topic = await TopicModel
        .findById(Types.ObjectId(topicId))
        .select('-__v')
      if(!topic) return next(new NotFoundException(`the topic with the Id ${topicId} was not found.`))

      const response = {
        ok: true,
        data: topic,
        url: req.url,
        code: HttpStatus.OK,
        message: 'topic found successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public update = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const topicId:string = req.query.topicId as string
    const topic:UpdateTopicDto = req.body

    try {
      const model = await TopicModel
        .findByIdAndUpdate(Types.ObjectId(topicId), {
          ...topic,
          updatedAt: Date.now()
        }, {
          new: true,
          useFindAndModify: false
        })
        .select('-__v')

      if(!model) return next(new NotFoundException(`the topic with the ID ${topicId} was not found.`))
      const response = {
        ok: true,
        data: model,
        url: req.url,
        code: HttpStatus.OK,
        message: 'updated topic successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public delete = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const topicId:string = req.query.topicId as string
    try {
      const topic = await TopicModel.findByIdAndDelete(Types.ObjectId(topicId)).select('-__v')
      if(!topic) return next(new NotFoundException(`the topic with the ID ${topicId} was not found.`))

      const response = {
        ok: true,
        data: topic,
        url: req.url,
        code: HttpStatus.OK,
        message: 'deleted topic successfully',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getAll = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      const topics = await TopicModel
        .find()
        .select('-__v')
      const response = {
        ok: true,
        url: req.url,
        data: topics,
        code: HttpStatus.OK,
        message: 'list of topics gated successfully.',
      }

      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public addTopicToTech = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    const topicId:string = req.query.topicId as string
    const techId:string = req.query.techId as string

    try {
      const tech = await TechModel.findByIdAndUpdate(techId,
      {
        $push: {
          topics: Types.ObjectId(topicId)
        },
        updatedAt: Date.now()
      }, {
        new: true,
        useFindAndModify: false
      })
      .select('-__v')

      if(!tech) return next(new NotFoundException(`the technology with the ID ${techId} was not found.`))
      const response = {
        ok: true,
        data: tech,
        url: req.url,
        code: HttpStatus.OK,
        message: `the topic was assigned to technology ${tech?.name}`,
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getTopicByTechId = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    const techId:string = req.query.techId as string
    try {
      const topics = await TechModel
        .findById(Types.ObjectId(techId))
        .populate('topics', '-__v')
        .select('-__v')

      if(!topics) return next(new NotFoundException(`the technology with the ID ${techId} was not found.`))
      const response = {
        ok: true,
        url: req.url,
        data: topics,
        code: HttpStatus.OK,
        message: 'list of topics gated successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }
}

export default new TopicHandler
