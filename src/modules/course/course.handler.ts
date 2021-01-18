import { Request, Response, NextFunction, Router } from 'express'
import { Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import middlews
import { TokenMiddlew, ObjectIdMiddlew } from '@common/middlew'

// Import enums
import { HttpStatus } from '@common/enums'

// Import services
import { ResponseService } from '@common/services'

// Import dto
import { CreateCourseDto, UpdateCourseDto } from '@modules/course/dto'

// Import models
import { CourseModel } from '@modules/course/models/course.model'
import { TopicModel } from '@modules/topic/models/topic.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '@common/exceptions'

class CourseHandler extends AbstractHandler {
  public path:string = '/course'
  public router:Router = Router()
  private response = ResponseService.response

  constructor() {
    super()

    this.router.route(this.path)
      .post(this.create)
      .put(ObjectIdMiddlew.isValid('courseId'), this.update)
      .get(ObjectIdMiddlew.isValid('courseId'), this.getById)
      .patch(ObjectIdMiddlew.isValid('courseId'), this.update)
      .delete(ObjectIdMiddlew.isValid('courseId'), this.delete)

    this.router.get(`${this.path}s`, this.getAll)
    this.router.get(`${this.path}/topic`, ObjectIdMiddlew.isValid('topicId'), this.getCourseByTopicId)
    this.router.post(`${this.path}/file`, ObjectIdMiddlew.isValid(['courseId', 'fileId']), this.addFileToCourse)
    this.router.post(`${this.path}/topic`, ObjectIdMiddlew.isValid(['courseId', 'topicId']), this.addCourseToTopic)
  }

  public create = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const course:CreateCourseDto = req.body
    try {
      const check = await CourseModel.findOne({ name: course.name })
      if(check) return next(new HttpException(HttpStatus.BAD_REQUEST, `the name property already exists and must be unique.`))

      const model = await CourseModel.create({ ...course })
      const document = await model.save()
      const response = {
        ok: true,
        url: req.url,
        data: document,
        code: HttpStatus.CREATED,
        message: 'course created successfully',
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getById = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const courseId:string = req.query.courseId as string
    try {
      const course = await CourseModel.findById({ _id: Types.ObjectId(courseId) }).select('-__v')
      if(!course) next(new NotFoundException(`course with ID ${courseId} was not found.`))

      const response = {
        ok: true,
        url: req.url,
        data: course,
        code: HttpStatus.OK,
        message: 'course found successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getAll = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      const courses = await CourseModel.find().select('-__v')
      const response = {
        ok: true,
        url: req.url,
        data: courses,
        code: HttpStatus.OK,
        message: 'list of courses gated successfully.',
      }

      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public update = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const courseId:string = req.query.courseId as string
    const course:UpdateCourseDto = req.body

    try {
      const model = await CourseModel.findByIdAndUpdate(courseId, { ...course, updatedAt: Date.now() }, { new: true, useFindAndModify: false })
      if(!model) next(new NotFoundException(`the course with the ID ${courseId} was not found.`))

      const response = {
        ok: true,
        data: model,
        url: req.url,
        code: HttpStatus.OK,
        message: 'updated course successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error'))
    }
  }

  public delete = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const courseId:string = req.query.courseId as string
    try {
      const course = await CourseModel.findByIdAndDelete(courseId, { new: true })
      if(!course) next(new NotFoundException(`the course with the ID ${courseId} was not found.`))

      const response = {
        ok: true,
        data: course,
        url: req.url,
        code: HttpStatus.OK,
        message: 'deleted course successfully',
      }

      res.status(response.code).json(this.response(response))

    } catch (error) {
      next(new InternalServerError('internal server error'))
    }
  }

  public getCourseByTopicId = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const topicId:string = req.query.topicId as string

    try {
      const courses = await TopicModel.findById(Types.ObjectId(topicId)).populate('courses').select('-__v')
      if(!courses) next(new NotFoundException(`the topic with the ID ${topicId} was not found.`))

      const response = {
        ok: true,
        url: req.url,
        data: courses,
        code: HttpStatus.OK,
        message: 'list of courses gated successfully.',
      }
      res.status(HttpStatus.OK).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public addFileToCourse = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const courseId:string = req.query.courseId as string
    const fileId:string = req.query.fileId as string

    try {
      const course = await CourseModel
        .findByIdAndUpdate(courseId, {
          $push: {
            files: Types.ObjectId(fileId)
          }
        }, {
          new: true,
          useFindAndModify: false
        })
        .select('-__v')
      if(!course) next(new NotFoundException(`the course with ID ${courseId} was not found.`))

      const response = {
        ok: true,
        url: req.url,
        data: course,
        code: HttpStatus.OK,
        message: `the file was assigned to course ${course?.name}.`,
      }

      res.status(HttpStatus.OK).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async addCourseToTopic(req:Request, res:Response, next:NextFunction):Promise<void> {
    const courseId:string = req.query.courseId as string
    const topicId:string = req.query.topicId as string

    try {
      const topic = await TopicModel
        .findByIdAndUpdate(topicId, {
          $push: {
            courses: Types.ObjectId(courseId)
          }
        }, {
          new: true,
          useFindAndModify: false
        })
        .select('-__v')

      if(!topic) next(new NotFoundException(`the topic with the ID ${topicId} was not found.`))
      const response = {
        ok: true,
        data: topic,
        url: req.url,
        code: HttpStatus.OK,
        message: `the course was assigned to topic ${topic?.name}`,
      }
      res.status(HttpStatus.OK).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
}

export default new CourseHandler
