import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'
import path from 'path'

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req:Request, file:Express.Multer.File, cb: FileFilterCallback) => {
    const fileTypes = /png|jpg|jpeg|pdf/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))
    if(mimeType && extname) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
})