import { Document } from 'mongoose'

// Import interfaces
import { ITask } from '@common/interfaces'

export interface ITaskModel extends ITask, Document {}