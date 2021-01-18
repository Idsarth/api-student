import { model, Schema } from 'mongoose'

// Import interfaces
import { ICourseModel } from '@modules/course/interfaces/course.interface'

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
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
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'task',
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
