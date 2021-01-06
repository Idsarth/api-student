import express, { Application } from 'express'

export class Server {
  public app: Application

  constructor() {
    this.app = express()

    this.middlew()
    this.handlers()
  }

  private middlew(): void {
    this.app.use(express.json())
  }


  private handlers():void {

  }

  public async listen(port:number, host:number, callback?: () => void): Promise<void> {
    this.app.listen(port, String(host), callback)
  }
}