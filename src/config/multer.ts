import { Request } from 'express'
import crypto from 'crypto'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req:Request, file:Express.Multer.File, cb:(err:Error | null, destination:string) => void) => {
    cb(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
  },
  filename: (req:Request, file:Express.Multer.File, cb:(err:Error | null, filename:string) => void) => {
    const bytes = crypto.randomBytes(16)
    cb(null, bytes.toString())
  }
})

export const upload = multer({
  storage,
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