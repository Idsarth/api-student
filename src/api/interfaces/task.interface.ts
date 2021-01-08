import { IModel } from './model.interface'

enum Platform {
  PLATZI = 'PLATZI',
  UDEMY = 'UDEMY',
  EDTEAM = 'EDTEAM',
  YOUTUBE = 'YOUTUBE'
}

export interface ITask extends IModel {
  name:string
  description?:string
  imageUrl?:string
  completed: boolean
  platform:Platform
}