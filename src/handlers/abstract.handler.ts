import { Response, Request, NextFunction, Router } from 'express'

// Import interfaces
import { IHandler } from '@common/interfaces'

export abstract class AbstractHandler implements IHandler {
  public abstract path:string
  public abstract router: Router

  public abstract getAll(req:Request, res:Response, next:NextFunction):Promise<void>
  public abstract getById(req:Request, res:Response, next:NextFunction):Promise<void>
  public abstract create(req:Request, res:Response, next:NextFunction):Promise<void>
  public abstract update(req:Request, res:Response, next:NextFunction):Promise<void>
  public abstract delete(req:Request, res:Response, next:NextFunction):Promise<void>
}
