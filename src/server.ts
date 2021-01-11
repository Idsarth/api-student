import express, { Application, json, urlencoded } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import cors from 'cors'

// Import handlers
import { handlers } from './api/routes'

// Import middlew
import { ErrorMiddlew } from './api/middlew'

export class Server {
  public app: Application

  constructor() {
    this.app = express()

    this.middlew()
    this.handlers()
    this.errHandler()
  }

  private middlew(): void {
    this.app.use(json())
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(express.static(path.join(__dirname, './public')))
  }
  
  private errHandler():void {
    this.app.use(ErrorMiddlew.error)
  }

  private handlers():void {
    handlers.forEach(handler => {
      this.app.use('/api/v1', handler.router)
    })
  }

  public async listen(port:number, host:string, callback?: () => void): Promise<void> {
    this.app.listen(port, host, callback)
  }
}