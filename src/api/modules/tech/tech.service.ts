// Import model
import { TechnologyModel } from './tech.model'

// Import interfaces
import {  } from '../../interfaces'

// Import dto
import { TechDto } from './tech.dto'

// Import Exception
import { HttpException } from '../../exceptions'

// Import services
import { HttpStatus } from '../../services/http-status.service'

export class TechService {
  public tech = TechnologyModel
  
  public async create(technology: TechDto):Promise<any> {
    const res = this.tech.findOne({ name: technology.name })
    if(res) throw new HttpException(HttpStatus.BAD_REQUEST, `the name property must be unique.`)

    const tech = this.tech.create({ ...technology })
  }
  
  public async find():Promise<any> {
    return 
  }
}