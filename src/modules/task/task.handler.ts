import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '@common/middlew'

// Import enums
import { HttpStatus } from '@common/enums'

// Import services
import { ResponseService } from '@common/services'

// Import dto
import { CreateTaskDto, UpdateTaskDto } from '@modules/task/dto'

// Import models
import { TaskModel } from '@modules/task/models/task.model'
import { CourseModel } from '@modules/course/course.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '@common/exceptions'

class TaskHandler extends AbstractHandler {
  public path:string = '/task'
  public router:Router = Router()
  private response = ResponseService.response

  constructor() {
    super()

    this.router.put(this.path, this.update.bind(this))
    this.router.get(this.path, this.getById.bind(this))
    this.router.post(this.path, this.create.bind(this))
    this.router.patch(this.path, this.update.bind(this))
    this.router.get(`${this.path}s`, this.getAll.bind(this))
    this.router.post(this.path, this.addNoteToTask.bind(this))
    this.router.post(this.path, this.addTaskToCourse.bind(this))
    this.router.get(this.path, this.getTaskByCourseId.bind(this))
    this.router.post(`${this.path}/file`, this.addFileToTask.bind(this))

  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const task:CreateTaskDto = req.body
    try {
      const check = await TaskModel.findOne({ name: task.name })
      if(check) next(new HttpException(HttpStatus.BAD_REQUEST, `the name property already exists and must be unique.`))

      const model = await TaskModel.create({ ...task })
      const document = await model.save()
      const response = {
        data: document,
        ok: true,
        code: HttpStatus.CREATED,
        message: 'task created successfully',
        url: req.url
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
 
  public async getById(req:Request, res:Response, next:NextFunction):Promise<void> {
    const taskId:string = req.query.taskId as string
    try {
      if(!isValidObjectId(taskId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param taskId is not valid.'))

      const task = await TaskModel.findById({ _id: Types.ObjectId(taskId) }).select('-__v')
      if(!task) next(new NotFoundException(`task with ID ${taskId} was not found.`))

      const response = {
        data: task,
        ok: true,
        code: HttpStatus.OK,
        message: 'course found successfully.',
        url: req.url
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async getAll(req:Request, res:Response, next:NextFunction):Promise<void> {
    try {
      const tasks = await TaskModel.find().select('-__v')
      const response = {
        data: tasks,
        ok: true,
        code: HttpStatus.OK,
        message: 'list of tasks gated successfully.',
        url: req.url,
      }
      
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async update(req:Request, res:Response, next:NextFunction):Promise<void> {
    const taskId:string = req.query.taskId as string
    const task:UpdateTaskDto = req.body

    try {
      if(!isValidObjectId(taskId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param taskId is not valid.'))

      const model = await TaskModel.findByIdAndUpdate(taskId, { ...task, updatedAt: Date.now() }, { new: true, useFindAndModify: false })
      if(!model) next(new NotFoundException(`the task with the ID ${taskId} was not found.`))

      const response = {
        data: model,
        ok: true,
        code: HttpStatus.OK,
        message: 'updated task successfully.',
        url: req.url
      }
      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error'))
    }
  }

  public async delete(req:Request, res:Response, next:NextFunction):Promise<void> {
    const taskId:string = req.query.taskId as string
    try {
      if(!isValidObjectId(taskId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param taskId is not valid.'))

      const task = await TaskModel.findByIdAndDelete(taskId, { new: true })
      if(!task) next(new NotFoundException(`the taskId with the ID ${taskId} was not found.`))

      const response = {
        data: task,
        ok: true,
        code: HttpStatus.OK,
        message: 'deleted task successfully',
        url: req.url,
      }

      res.status(response.code).json(this.response(response))

    } catch (error) {
      next(new InternalServerError('internal server error'))
    }
  }

  public async getTaskByCourseId(req:Request, res:Response, next:NextFunction):Promise<void> {
    const courseId:string = req.query.courseId as string

    try {
      if(!isValidObjectId(courseId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param courdId is not valid.'))

      const tasks = await CourseModel.findById(courseId).populate('tasks').select('-__v')
      if(!tasks) next(new NotFoundException(`the course with the ID ${courseId} was not found.`))

      const response = {
        data: tasks,
        ok: true,
        code: HttpStatus.OK,
        message: 'list of tasks gated successfully.',
        url: req.url,
      }

      res.status(HttpStatus.OK).json(this.response(response))

    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async addFileToTask(req:Request, res:Response, next:NextFunction):Promise<void> {
    const taskId:string = req.query.taskId as string
    const fileId:string = req.query.fileId as string
    try {
      if(!isValidObjectId(taskId) || !isValidObjectId(fileId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the params taskId or fileId is not valid.'))

      const task = await TaskModel.findByIdAndUpdate(taskId, { $push: { files: Types.ObjectId(fileId) } }, { new: true, useFindAndModify: false }).select('-__v')
      if(!task) next(new NotFoundException(`task with ID ${taskId} was not found.`))

      const response = {
        data: task,
        ok: true,
        code: HttpStatus.OK,
        message: 'file added successfully.',
        url: req.url,
      }

      res.status(HttpStatus.OK).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async addTaskToCourse(req:Request, res:Response, next:NextFunction):Promise<void> {
    const courseId:string = req.query.courseId as string
    const taskId:string = req.query.techId as string

    try {
      if(!isValidObjectId(courseId) || !isValidObjectId(taskId)) {
        next(new HttpException(HttpStatus.BAD_REQUEST, `the params courseId or taskId is not valid.`))
      }

      const course = await CourseModel.findByIdAndUpdate(courseId, { $push: { tasks: Types.ObjectId(taskId) } }, { new: true, useFindAndModify: false })
      if(!course) next(new NotFoundException(`the course with the ID ${courseId} was not found.`))

      const response = {
        data: course,
        ok: true,
        code: HttpStatus.OK,
        message: `the task was assigned to course ${course?.name}`,
        url: req.url,
      }
      res.status(HttpStatus.OK).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async addNoteToTask(req:Request, res:Response, next:NextFunction):Promise<void> {
    const taskId:string = req.query.taskId as string
    const noteId:string = req.query.noteId as string
    try {
      if(!isValidObjectId(taskId) || !isValidObjectId(noteId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the params taskId or nodeId is not valid.'))

      const task = await TaskModel.findByIdAndUpdate(taskId, { $push: { notes: Types.ObjectId(noteId) } }, { new: true, useFindAndModify: false})
      if(!task) next(new NotFoundException(`the task with the ID ${taskId} was not found. `))

      const response = {
        data: task,
        ok: true,
        code: HttpStatus.OK,
        message: 'note added successfully.',
        url: req.url,
      }

      res.status(response.code).json(this.response(response))
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async addTopicToTask():Promise<void> {}
  
}

export default new TaskHandler
