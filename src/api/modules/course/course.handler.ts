import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '../../middlew'

// Import services
import { HttpStatus } from '../../services'

// Import dto
import { CourseDto } from './course.dto'

// Import model
import { CourseModel } from './course.model'
import { TechnologyModel as TechModel } from '../tech/tech.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '../../exceptions'

// Import interfaces
import { IResponse } from '../../interfaces'

class CourseHandler extends AbstractHandler {
  public path:string = '/course'
  public router:Router = Router()

  constructor() {
    super()
    this.router.post(this.path, this.create)
    this.router.get(`${this.path}s`, this.getAll)
    this.router.get(`${this.path}`, this.getById)
    this.router.post(`${this.path}/tech`, this.assignCourseToTech)
  }

  public async getAll(req:Request, res:Response, next:NextFunction):Promise<void> {
    try {
      const courses = await CourseModel.find().select('-__v').populate('tasks', '-__v')
      const response:IResponse = {
        data: courses,
        status: {
          ok: true,
          code: HttpStatus.OK,
          message: 'list of courses gated successfully.'
        },
        info: {
          url: req.url,
          datetime: new Date(Date.now()).toLocaleString()
        }
      }
      
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
  public async getById(req:Request, res:Response, next:NextFunction):Promise<void> {
    const courseId:string = req.query.courseId as string
    try {
      if(isValidObjectId(courseId)) {
        const course = await CourseModel.findById({ _id: Types.ObjectId(courseId)}).select('-__v').populate('tasks', '-__v')
        if(!course) {
          next(new NotFoundException('course not found.'))
        } else {
          const response:IResponse = {
            data: course,
            status: {
              ok: true,
              code: HttpStatus.OK,
              message: 'course found successfully.'
            },
            info: {
              url: req.url,
              datetime: new Date(Date.now()).toLocaleString()
            }
          }
          res.status(HttpStatus.OK).json(response)
        }
      } else {
        next(new HttpException(HttpStatus.BAD_REQUEST, 'the param courseId is not valid.'))
      }
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const course:CourseDto = req.body

    try {
      const check = await CourseModel.findOne({ name: course.name })
      if(check) next(new HttpException(HttpStatus.BAD_REQUEST, `the name property must be unique.`))
      else {
        const model = await CourseModel.create({ ...course })
        const document = await model.save()

        const response:IResponse = {
          data: document,
          status: {
            ok: true,
            code: HttpStatus.CREATED,
            message: 'course created successfully.'
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
  public async assignCourseToTech(req:Request, res:Response, next:NextFunction): Promise<void> {
    const courseId:string = req.query.courseId as string
    const techId:string = req.query.techId as string

    try {
      const tech = await TechModel.findByIdAndUpdate(techId, { $push: { courses: Types.ObjectId(courseId) } }, { new: true, useFindAndModify: false })
      if(!tech) next(new NotFoundException(`the technology with the ID ${techId} was not found.`))
      const response:IResponse = {
        data: tech,
        status: {
          ok: true,
          code: HttpStatus.OK,
          message: `the course was assigned to technology ${tech?.name}`
        },
        info: {
          url: req.url,
          datetime: new Date(Date.now()).toLocaleString()
        }
      }
      res.status(HttpStatus.OK).json(response)
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async delete():Promise<void> {}
  public async update():Promise<void> {}
}

export default new CourseHandler()
