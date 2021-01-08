import { model, Schema, Document } from 'mongoose'

// Import interfaces
import { ICourse } from '../../interfaces'

interface ICourseModel extends ICourse, Document {}

export const CourseSchema = new Schema({
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
    ref: 'task'
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

const Course = model<ICourseModel>('course', CourseSchema)
export default Course
