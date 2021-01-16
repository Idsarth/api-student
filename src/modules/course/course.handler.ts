import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '@common/middlew'

// Import enums
import { HttpStatus } from '@common/enums'

// Import dto
import { CreateCourseDto, UpdateCourseDto } from '@modules/course/dto'

// Import model
import { CourseModel } from '@modules/course/models/course.model'
import { TechnologyModel as TechModel } from '@modules/tech/models/tech.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '@common/exceptions'

// Import interfaces
import { ResponseService } from '@common/services'

class CourseHandler extends AbstractHandler {
  public path:string = '/course'
  public router:Router = Router()
  private response = ResponseService.response

  constructor() {
    super()

    this.router.put(this.path, this.update.bind(this))
    this.router.post(this.path, this.create.bind(this))
    this.router.get(this.path, this.getById.bind(this))
    this.router.patch(this.path, this.update.bind(this))
    this.router.delete(this.path, this.delete.bind(this))
    this.router.get(`${this.path}s`, this.getAll.bind(this))
    this.router.post(`${this.path}/tech`, this.addCourseToTech.bind(this))
    this.router.get(`${this.path}/tech`, this.getCourseByTechId.bind(this))
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const course:CreateCourseDto = req.body

    try {
      const check = await CourseModel.findOne({ name: course.name })
      if(check) next(new HttpException(HttpStatus.BAD_REQUEST, `the name property already exits and must be unique.`))

      const model = await CourseModel.create({ ...course })
      const document = await model.save()

      const response = {
        data: document,
        ok: true,
        code: HttpStatus.CREATED,
        message: 'course created successfully.',
        url: req.url,
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async getById(req:Request, res:Response, next:NextFunction):Promise<void> {
    const courseId:string = req.query.courseId as string
    try {
      if(!isValidObjectId(courseId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param courseId is not valid.'))

      const course = await CourseModel
        .findById({ _id: Types.ObjectId(courseId)})
        .select('-__v')
        .populate('tasks', '-__v')

      if(!course) next(new NotFoundException('course not found.'))
      const response = {
        data: course,
        ok: true,
        code: HttpStatus.OK,
        message: 'course found successfully.',
        url: req.url,
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async update(req:Request, res:Response, next:NextFunction):Promise<void> {
    const courseId:string = req.query.courdeId as string
    const course:UpdateCourseDto = req.body
    try {
      if(!isValidObjectId((courseId))) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param courseId is not valid.'))

      const model = await CourseModel.findByIdAndUpdate(courseId, { ...course, updatedAt: Date.now() }, { new: true, useFindAndModify: false })
      if(!model) next(new NotFoundException(`the course with the ID ${courseId} was not found.`))

      const response = {
        data: model,
        ok: true,
        code: HttpStatus.OK,
        message: 'updated course successfully.',
        url: req.url
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async delete(req:Request, res:Response, next:NextFunction):Promise<void> {
    const courseId:string = req.query.courseId as string
    try {
      if(!isValidObjectId(courseId)) next(new HttpException(HttpStatus.BAD_GATEWAY, 'the param courseId is not valid.'))

      const course = await CourseModel.findByIdAndDelete(courseId, { new: true }).select('-__v')
      if(!course) next(new NotFoundException(`the course with the ID ${courseId} was not found.`))

      const response = {
        data: course,
        ok: true,
        code: HttpStatus.OK,
        message: 'deleted course successfully',
        url: req.url
      }

      res.status(response.code).json(this.response(response))

    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async getAll(req:Request, res:Response, next:NextFunction):Promise<void> {
    try {
      const courses = await CourseModel
        .find()
        .select('-__v')
        .populate('tasks', '-__v')
      const response = {
        data: courses,
        ok: true,
        code: HttpStatus.OK,
        message: 'list of courses gated successfully.',
        url: req.url,
      }

      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async addCourseToTech(req:Request, res:Response, next:NextFunction): Promise<void> {
    const courseId:string = req.query.courseId as string
    const techId:string = req.query.techId as string

    try {
      if(!isValidObjectId(courseId) || !isValidObjectId(techId)) next(new HttpException(HttpStatus.BAD_REQUEST, `the params courseId or techId is not valid.`))

      const tech = await TechModel.findByIdAndUpdate(techId,
      { $push: { courses: Types.ObjectId(courseId) } }, { new: true, useFindAndModify: false })

      if(!tech) next(new NotFoundException(`the technology with the ID ${techId} was not found.`))

      const response = {
        data: tech,
        ok: true,
        code: HttpStatus.OK,
        message: `the course was assigned to technology ${tech?.name}`,
        url: req.url,
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async getCourseByTechId(req:Request, res:Response, next:NextFunction): Promise<void> {
    const techId:string = req.query.techId as string
    try {
      if(!isValidObjectId(techId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param techId is not valid.'))

      const courses = await TechModel
        .findById(techId)
        .populate('courses')
        .select('-__v')

      if(!courses) next(new NotFoundException(`the tech with the ID ${techId} was not found.`))
      const response = {
        data: courses,
        ok: true,
        code: HttpStatus.OK,
        message: 'list of courses gated successfully.',
        url: req.url
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }
}

export default new CourseHandler
