import { Router, Request, Response, NextFunction } from 'express'
import { S3 } from 'aws-sdk'

// Import envs
import { AWS_BUCKET_NAME_S3 } from '../../env'

// Import handlers
import { AbstractHandler } from '@handlers/abstract.handler'

// Import model
import { FileModel } from '@modules/file/models/file.model'

// Import config
import { s3 } from '@config/aws'
import { upload } from '@config/multer'

// Import exceptions
import { InternalServerError } from '@common/exceptions'

// Import dto
import { CreateFileDto } from '@modules/file/dto/create-file.dto'

// Import interfaces
import { IResponse } from '@common/interfaces'

// Import enums
import { HttpStatus } from '@common/enums'

class FileHandler extends AbstractHandler {
  public path:string = '/file'
  public router:Router = Router()

  constructor() {
    super()

    this.router.post(this.path, upload.single('file'), this.create)
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const body:CreateFileDto = req.body
    try {
      const { originalname, size, buffer } = req.file
      const file = originalname.replace(/\s/g, '').split('.')
      const params:S3.Types.PutObjectRequest = {
        Bucket: AWS_BUCKET_NAME_S3,
        Key: `${Date.now()}.${file[file.length - 1]}`,
        Body: buffer
      }
      s3.upload(params, async (err:Error, data:S3.ManagedUpload.SendData) => {
        if(err) next(new InternalServerError('internal server error'))
        const model = await FileModel.create({
          name: file[0],
          size,
          path: data.Location,
          type: 'PDF',
          ...body,
        })
        const document = await model.save()
        const response:IResponse = {
          data: document,
          status: {
            ok: true,
            code: HttpStatus.CREATED,
            message: ''
          },
          info: {
            url: req.url,
            datetime: new Date(Date.now()).toLocaleString()
          }
        }
        res.status(HttpStatus.CREATED).json(response)
      })
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
  public async getAll():Promise<void> {}
  public async update():Promise<void> {}
  public async delete():Promise<void> {}
  public async getById():Promise<void> {}
}

export default new FileHandler
