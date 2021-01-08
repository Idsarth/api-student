// Import model
import { CourseModel, ICourseModel } from './course.model'

// Import interfaces
import {  } from '../../interfaces'

// Import dto
import { CourseDto } from './course.dto'

// Import Exception
import { HttpException } from '../../exceptions'

// Import services
import { HttpStatus } from '../../services/http-status.service'

export class CourseService {
  public tech = CourseModel
  
  public async create(course: CourseDto):Promise<ICourseModel> {
    const res = this.tech.findOne({ name: course.name })
    if(res) throw new HttpException(HttpStatus.BAD_REQUEST, `the name property must be unique.`)

    const model = await this.tech.create({ ...course })
    const document = await model.save()

    return document
  }
  
  public async find():Promise<any> {
    return 
  }
}

