import express, { Application, json, urlencoded } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'

export class Server {
  public app: Application

  constructor() {
    this.app = express()

    this.middlew()
    this.handlers()
  }

  private middlew(): void {
    this.app.use(json())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(urlencoded({ extended: true }))
    this.app.use('/public', express.static(path.join(__dirname, './public')))
  }


  private handlers():void {

  }

  public async listen(port:number, host:string, callback?: () => void): Promise<void> {
    this.app.listen(port, host, callback)
  }
}