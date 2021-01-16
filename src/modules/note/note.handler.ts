import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '@common/middlew'

// Import enums
import { HttpStatus } from '@common/enums'

// Import dto
import { CreateNoteDto, UpdateNoteDto } from '@modules/note/dto'

// Import model
import { NoteModel } from '@modules/note/models/note.model'
import { TaskModel } from '@modules/task/models/task.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '@common/exceptions'

// Import services
import { ResponseService } from '@common/services'

class NoteHandler extends AbstractHandler {
  public path:string = '/note'
  public router:Router = Router()
  private response = ResponseService.response

  constructor() {
    super()

    this.router.put(this.path, this.update.bind(this))
    this.router.post(this.path, this.create.bind(this))
    this.router.patch(this.path, this.update.bind(this))
    this.router.post(this.path, this.addNoteToTask.bind(this))
    this.router.get(this.path, this.getNoteByTaskId.bind(this))
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const note:CreateNoteDto = req.body
    const taskId:string = req.query.taskId as string

    try {
      if(!isValidObjectId(taskId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param taskId is not valid'))
      const model = await NoteModel.create({ ...note })
      const document = await model.save()

      const task = await TaskModel.findByIdAndUpdate(taskId, { $push: { notes: Types.ObjectId(document._id) }}, { new: true, useFindAndModify: false })
      if(!task) next(new NotFoundException(`the task with the ID ${taskId} was not found.`))

      const response = {
        data: document,
        ok: true,
        code: HttpStatus.CREATED,
        message: 'created note successfully.',
        url: req.url,
      }

      res.status(response.code).json(this.response(response))

    } catch (error) {
      next(new InternalServerError('internal server error'))
    }
  }

  public async update(req:Request, res:Response, next:NextFunction):Promise<void>{
    const noteId:string = req.query.noteId as string
    const note:UpdateNoteDto = req.body

    try {
      if(!isValidObjectId(noteId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param noteId is not valid.'))

      const model = await NoteModel.findByIdAndUpdate(noteId, { ...note, updatedAt: Date.now() }, { new: true, useFindAndModify: false })
      if(!model) next(new NotFoundException(`the note with the ID ${noteId} was not found.`))

      const response = {
        data: model,
        ok: true,
        code: HttpStatus.OK,
        message: 'updated note successfully.',
        url: req.url,
      }

      res.status(response.code).json(this.response(response))

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

  public async getNoteByTaskId(req:Request, res:Response, next:NextFunction):Promise<void> {
    const taskId:string = req.query.taskId as string

    try {
      if(!isValidObjectId(taskId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param taskId is not valid.'))

      const notes = await TaskModel.findById(taskId).populate('notes').select('-__v')
      if(!notes) next(new NotFoundException(`the task with the ID ${taskId} was not found.`))

      const response = {
        data: notes,
        ok: true,
        code: HttpStatus.OK,
        message: 'list of notes gated successfully.',
        url: req.url,
      }

      res.status(response.code).json(this.response(response))

    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }

  public async getById():Promise<void> {}
  public async getAll():Promise<void>{}
  public async delete():Promise<void> {}

}

export default new NoteHandler()
