import { Request, Response, NextFunction, Router } from 'express'

// Import handlers
import { AbstractHandler } from '../../handlers/abstract.handler'

// Import middlews
import { TokenMiddlew } from '../../middlew'

// Import services
import { HttpStatus } from '../../services/http-status.service'
import { CourseService } from './course.service'

// Import dto
import { CourseDto } from './course.dto'

// Import exceptions
import { InternalServerError } from '../../exceptions'

export class CourseHandler extends AbstractHandler {
  public path:string = '/course'
  public router:Router = Router()
  public courseService = new CourseService()

  constructor() {
    super()

    this.router.use(TokenMiddlew.validated)
      .route(this.path)
      .get(this.getAll)
      .put(this.update)
      .get(this.getById)
      .post(this.create)
      .delete(this.delete)
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<Response<any>> {
    const body: CourseDto = req.body
    try {
      const course = await this.courseService.create(body)

      return res.status(201).json({ status: 201, data: course, ok: true })
    } catch (error) {
      throw new InternalServerError('internal server error.')
    }
  }
  public async getById():Promise<void> {}
  public async getAll(req: Request, res:Response, next:NextFunction):Promise<Response<any>> {
    return res.json({})
  }
  public async delete():Promise<void> {}
  public async update():Promise<void> {}
}