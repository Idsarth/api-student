import { Document } from 'mongoose'

// Import interfaces
import { IFile } from '@common/interfaces'

export interface IFileModel extends IFile, Document {}