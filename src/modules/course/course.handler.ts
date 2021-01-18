import { Request, Response, NextFunction, Router } from 'express'
import { Types, isValidObjectId } from 'mongoose'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import middlews
import { TokenMiddlew, ObjectIdMiddlew } from '@common/middlew'

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

    this.router.route(this.path)
      .post(this.create)
      .delete(ObjectIdMiddlew.isValid('courseId'), this.delete)
      .put(ObjectIdMiddlew.isValid('courseId'), this.update)
      .get(ObjectIdMiddlew.isValid('courseId'), this.getById)
      .patch(ObjectIdMiddlew.isValid('courseId'), this.update)

    this.router.get(`${this.path}s`, this.getAll)
    this.router.post(`${this.path}/tech`, ObjectIdMiddlew.isValid(['techId', 'courseId']), this.addCourseToTech)
    this.router.get(`${this.path}/tech`, this.getCourseByTechId)
  }

  public create = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const course:CreateCourseDto = req.body

    try {
      const check = await CourseModel.findOne({ name: course.name })
      if(check) return next(new HttpException(HttpStatus.BAD_REQUEST, `the name property already exits and must be unique.`))

      const model = await CourseModel.create({ ...course })
      const document = await model.save()

      const response = {
        data: document,
        ok: true,
        code: HttpStatus.CREATED,
        message: 'created course successfully.',
        url: req.url,
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public getById = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const courseId:string = req.query.courseId as string
    try {
      const course = await CourseModel
        .findById(Types.ObjectId(courseId))
        .select('-__v')

      if(!course) return next(new NotFoundException(`the course with the Id ${courseId} was not found.`))

      const response = {
        ok: true,
        url: req.url,
        data: course,
        code: HttpStatus.OK,
        message: 'course found successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public update = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const courseId:string = req.query.courseId as string
    const course:UpdateCourseDto = req.body

    try {
      const model = await CourseModel
        .findByIdAndUpdate(Types.ObjectId(courseId), {
          ...course,
          updatedAt: Date.now()
        }, {
          new: true,
          useFindAndModify: false
        })
        .select('-__v')

      if(!model) return next(new NotFoundException(`the course with the ID ${courseId} was not found.`))
      const response = {
        ok: true,
        data: model,
        url: req.url,
        code: HttpStatus.OK,
        message: 'updated course successfully.',
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public delete = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const courseId:string = req.query.courseId as string
    try {
      const course = await CourseModel.findByIdAndDelete(Types.ObjectId(courseId)).select('-__v')
      if(!course) return next(new NotFoundException(`the course with the ID ${courseId} was not found.`))

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

  public getAll = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
      const courses = await CourseModel
        .find()
        .select('-__v')
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

  public addCourseToTech = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    const courseId:string = req.query.courseId as string
    const techId:string = req.query.techId as string

    try {
      const tech = await TechModel.findByIdAndUpdate(techId,
      {
        $push: {
          courses: Types.ObjectId(courseId)
        },
        updatedAt: Date.now()
      }, {
        new: true,
        useFindAndModify: false
      })

      if(!tech) return next(new NotFoundException(`the technology with the ID ${techId} was not found.`))
      const response = {
        ok: true,
        data: tech,
        url: req.url,
        code: HttpStatus.OK,
        message: `the course was assigned to technology ${tech?.name}`,
      }
      res.status(response.code).json(this.response(response))
    } catch (err) {
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
