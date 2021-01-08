import { Response, Request, NextFunction, Router } from 'express'

// Import interfaces
import { IHandler } from '../interfaces'

export abstract class AbstractHandler implements IHandler {
  public abstract path:string
  public abstract router: Router

  constructor() {}

  public abstract getAll<T>(req:Request, res:Response, next:NextFunction):Promise<Response<T>>
  public abstract getById(req:Request, res:Response, next:NextFunction):Promise<void>
  public abstract create<T>(req:Request, res:Response, next:NextFunction):Promise<Response<T>>
  public abstract update(req:Request, res:Response, next:NextFunction):Promise<void>
  public abstract delete(req:Request, res:Response, next:NextFunction):Promise<void>
}