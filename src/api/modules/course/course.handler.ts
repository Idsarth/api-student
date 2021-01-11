import { Request, Response, NextFunction, Router } from 'express'
import { Model } from 'mongoose'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '../../middlew'

// Import services
import { HttpStatus } from '../../services/http-status.service'

// Import dto
import { CourseDto } from './course.dto'

// Import model
import { CourseModel, ICourseModel } from './course.model'

// Import exceptions
import { InternalServerError, HttpException,  } from '../../exceptions'

class CourseHandler {
  public path:string = '/course'
  public router:Router = Router()

  constructor() {
    this.router
      .route(this.path)
      .get(this.getAll)
      .put(this.update)
      .get(this.getById)
      .post(this.create.bind(CourseHandler))
      .delete(this.delete)
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const course: CourseDto = req.body
    try {
      const check = CourseModel.findOne({ name: course.name })
      if(check) next(new HttpException(HttpStatus.BAD_REQUEST, `the name property must be unique.`))
      else {
        const model = await CourseModel.create({ ...course })
        const document = await model.save()
  
        res.status(201).json({ status: 201, data: document, ok: true })
      }
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
  public async getById():Promise<void> {}
  public async getAll(req: Request, res:Response, next:NextFunction):Promise<Response<any>> {
    return res.json({})
  }
  public async delete():Promise<void> {}
  public async update():Promise<void> {}
}

export default new CourseHandler()
