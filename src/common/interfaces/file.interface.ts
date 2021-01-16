import { IModel } from '@common/interfaces/model.interface'

export interface IFile extends IModel {
  name:string
  size:number
  path:string
  type:string
}