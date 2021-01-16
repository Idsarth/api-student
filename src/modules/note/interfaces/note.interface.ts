import { Document } from 'mongoose'

// Import interfaces
import { INote } from '@common/interfaces'

export interface INoteModel extends INote, Document {}