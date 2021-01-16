import { IModel } from '@common/interfaces/model.interface'

// Import enums
import { Platform } from '@common/enums'

export interface ITask extends IModel {
  name:string
  description:string
  imageUrl:string
  completed:boolean
  platform:Platform
}