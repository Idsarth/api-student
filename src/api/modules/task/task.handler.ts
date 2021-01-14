import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '../../middlew'

// Import services
import { HttpStatus } from '../../services'

// Import dto
import { CreateTaskDto } from './task.dto'

// Import model
import { TaskModel } from './task.model'
import { CourseModel } from '../course/course.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '../../exceptions'

// Import interfaces
import { IResponse } from '../../interfaces'

class TaskHandler extends AbstractHandler {
  public path:string = '/task'
  public router:Router = Router()

  constructor() {
    super()
    this.router.post(this.path, this.create)
    this.router.get(this.path, this.getById)
    this.router.get(`${this.path}s`, this.getAll)
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const task:CreateTaskDto = req.body
    try {
      const check = await TaskModel.findOne({ name: task.name })
      if(check) next(new HttpException(HttpStatus.BAD_REQUEST, `the name property must be unique.`))
      else {
        const model = await TaskModel.create({ ...task })
        const document = await model.save()
        const response:IResponse = {
          data: document,
          status: {
            ok: true,
            code: HttpStatus.CREATED,
            message: 'task created successfully'
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
  public async assignTaskToCourse(req:Request, res:Response, next:NextFunction): Promise<void> {
    const courseId:string = req.query.courseId as string
    const taskId:string = req.query.techId as string

    try {
      const course = await CourseModel.findByIdAndUpdate(courseId, { $push: { tasks: Types.ObjectId(taskId) } }, { new: true, useFindAndModify: false })
      if(!course) next(new NotFoundException(`the course with the ID ${courseId} was not found.`))
      const response:IResponse = {
        data: course,
        status: {
          ok: true,
          code: HttpStatus.OK,
          message: `the task was assigned to course ${course?.name}`
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
    const taskId:string = req.query.taskId as string
    try {
      if(isValidObjectId(taskId)) {
        const task = await TaskModel.findById({ _id: Types.ObjectId(taskId) }).select('-__v')
        if(!task) next(new NotFoundException('task not found.'))
        else {
          const response:IResponse = {
            data: task,
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
        next(new HttpException(HttpStatus.BAD_REQUEST, 'the param taskId is not valid.'))
      }
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
  public async getAll(req:Request, res:Response, next:NextFunction):Promise<void> {
    try {
      const tasks = await TaskModel.find().select('-__v')
      const response:IResponse = {
        data: tasks,
        status: {
          ok: true,
          code: HttpStatus.OK,
          message: 'list of tasks gated successfully.'
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

export default new TaskHandler()
