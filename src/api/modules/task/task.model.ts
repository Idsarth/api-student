import { model, Schema, Document } from 'mongoose'

// Import interfaces
import { ITask } from '../../interfaces'

interface ITaskModel extends ITask, Document {}

const TaskSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  platform: {
    type: String,
    required: true,
    enum: ['PLATZI', 'UDEMY', 'EDTEAM', 'YOUTUBE'],
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

export const TaskModel = model<ITaskModel>('task', TaskSchema)
