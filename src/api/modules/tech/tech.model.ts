import { model, Schema, Document } from 'mongoose'

// Import interfaces
import { ITechnology } from '../../interfaces'

interface ITechModel extends ITechnology, Document {}

export const TechSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  docsUrl: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'course'
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

const Technology = model<ITechModel>('technology', TechSchema)
export default Technology
