import { model, Schema } from 'mongoose'

// Import interfaces
import { ITopicModel } from '@modules/topic/interfaces/topic.interface'

const TopicSchema = new Schema({
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
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'course',
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

export const TopicModel = model<ITopicModel>('topic', TopicSchema)
