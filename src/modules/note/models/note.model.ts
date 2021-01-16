import { model, Schema } from 'mongoose'

// Import interfaces
import { INoteModel } from '@modules/note/interfaces/note.interface'

const NoteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
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

export const NoteModel = model<INoteModel>('note', NoteSchema)