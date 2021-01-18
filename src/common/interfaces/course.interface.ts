import { IModel } from '@common/interfaces/model.interface'

// Import enums
import { Platform } from '@common/enums'

export interface ICourse extends IModel {
  name:string
  description:string
  imageUrl:string
  completed:boolean
  platform:Platform
}
