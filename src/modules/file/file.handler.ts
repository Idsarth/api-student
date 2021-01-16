import { Router, Request, Response, NextFunction } from 'express'
import { S3 } from 'aws-sdk'

// Import services
import { ResponseService } from '@common/services'

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

// Import enums
import { HttpStatus } from '@common/enums'

class FileHandler extends AbstractHandler {
  public path:string = '/file'
  public router:Router = Router()
  private response = ResponseService.response

  constructor() {
    super()

    this.router.post(this.path, upload.single('file'), this.create.bind(this))
  }

  public async create(req:Request, res:Response, next:NextFunction):Promise<void> {
    const body:CreateFileDto = req.body
    try {
      const { originalname, size, buffer, mimetype } = req.file
      const name = originalname.replace(/\s/g, '')
      const params:S3.Types.PutObjectRequest = {
        Bucket: AWS_BUCKET_NAME_S3,
        Key: `${/application\/pdf/.test(mimetype) ? 'files' : 'images'}/${Date.now()}.${name.split('.')[name.split('.').length - 1]}`,
        Body: buffer
      }
      s3.upload(params, async (err:Error, data:S3.ManagedUpload.SendData) => {
        if(err) next(new InternalServerError('internal server error'))
        const model = await FileModel.create({
          name: name.split('.').slice(0, name.split('.').length - 1).join(''),
          size,
          path: data.Location,
          type: /application\/pdf/.test(mimetype) ? 'PDF' : 'IMAGE',
          ...body,
        })
        const document = await model.save()
        const response = {
          data: document,
          ok: true,
          code: HttpStatus.CREATED,
          message: `${/application\/pdf/.test(mimetype) ? 'file' : 'image'} uploaded successfully.`,
          url: req.url
        }
        res.status(HttpStatus.CREATED).json(this.response(response))
      })
    } catch (error) {
      next(new InternalServerError('internal server error.'))
    }
  }
  public async getById():Promise<void> {}
  public async getAll():Promise<void> {}
  public async update():Promise<void> {}
  public async delete():Promise<void> {}
}

export default new FileHandler()
