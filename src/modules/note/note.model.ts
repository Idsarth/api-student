import { model, Schema, Document } from 'mongoose'

// Import interfaces
import { INote } from '@common/interfaces'

interface INoteModel extends INote, Document {}

const NoteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  }
})

export const NoteModel = model<INoteModel>('note', NoteSchema)