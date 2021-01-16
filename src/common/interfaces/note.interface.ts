import { IModel } from '@common/interfaces/model.interface'

export interface INote extends IModel {
  name:string
  description:string
}