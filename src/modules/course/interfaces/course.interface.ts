import { Document } from 'mongoose'

// Import interfaces
import { ICourse } from '@common/interfaces'

export interface ICourseModel extends ICourse, Document {}
