import { model, Schema } from 'mongoose'

// import interfaces
import { IFileModel } from '@modules/file/interfaces/file.interface'

const FileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['IMAGE', 'PDF']
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export const FileModel = model<IFileModel>('file', FileSchema)
