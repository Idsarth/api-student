import { Document } from 'mongoose'

// Import interfaces
import { ITopic } from '@common/interfaces'

export interface ITopicModel extends ITopic, Document {}
