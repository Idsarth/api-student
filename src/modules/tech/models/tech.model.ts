import { model, Schema } from 'mongoose'

// Import interfaces
import { ITechModel } from '@modules/tech/interfaces/tech.interface'

const TechSchema = new Schema({
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
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'topic'
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

export const TechnologyModel = model<ITechModel>('technology', TechSchema)
