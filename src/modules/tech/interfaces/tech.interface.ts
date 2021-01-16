import { Document } from 'mongoose'

// Import interfaces
import { ITechnology } from '@common/interfaces'

export interface ITechModel extends ITechnology, Document {}
