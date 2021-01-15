import { Request, Response, NextFunction, Router } from 'express'
import { isValidObjectId, Types } from 'mongoose'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '../../middlew'

// Import services
import { HttpStatus } from '../../services'

// Import dto
import { CreateNoteDto } from './note.dto'

// Import model
import { NoteModel } from './note.model'
import { TaskModel } from '../task/task.model'

// Import exceptions
import { InternalServerError, HttpException, NotFoundException } from '../../../src/common/exceptions'

// Import interfaces
import { IResponse } from '../../interfaces'

class NoteHandler extends AbstractHandler {
  public path:string = '/note'
  public router:Router = Router()

  constructor() {
    super()

    this.router.post(this.path,this.create)
  }

  public async create(req:Request, res:Response, next:NextFunction) {
    const note:CreateNoteDto = req.body
    const taskId:string = req.query.taskId as string

    try {
      if(!isValidObjectId(taskId)) next(new HttpException(HttpStatus.BAD_REQUEST, 'the param taskId is not valid'))
      const model = await NoteModel.create({ ...note })
      const document = await model.save()

      const task = await TaskModel.findByIdAndUpdate(taskId, { $push: { notes: { _id: Types.ObjectId(document._id) } }}, { new: true, useFindAndModify: false })
      if(!task) next(new NotFoundException(`the task with the ID ${taskId} was not found.`))

      const response:IResponse = {
        data: document,
        status: {
          ok: true,
          code: HttpStatus.CREATED,
          message: 'created note successfully.'
        },
        info: {
          url: req.url,
          datetime: new Date(Date.now()).toLocaleString()
        }
      }

      res.status(HttpStatus.CREATED).json(response)

    } catch (error) {
      next(new InternalServerError('internal server error'))
    }
  }
  public async getById():Promise<void> {}
  public async getAll():Promise<void>{}
  public async delete():Promise<void> {}
  public async update():Promise<void>{}

}

export default new NoteHandler()
