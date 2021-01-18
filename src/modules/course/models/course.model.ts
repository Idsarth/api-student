import { model, Schema } from 'mongoose'

// Import interfaces
import { ICourseModel } from '@modules/course/interfaces/course.interface'

const CourseSchema = new Schema({
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
  status: {
    type: String,
    required: true,
    default: 'PENDING',
    enum: ['CURRENT', 'PENDING', 'COMPLETED']
  },
  platform: {
    type: String,
    required: true,
    enum: ['PLATZI', 'UDEMY', 'EDTEAM', 'YOUTUBE'],
  },
  notes: [{
    ref: 'note',
    type: Schema.Types.ObjectId,
    unique: true
  }],
  files: [{
    ref: 'file',
    type: Schema.Types.ObjectId,
    unique: true
  }],
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export const CourseModel = model<ICourseModel>('course', CourseSchema)
