import fs from 'fs'
import path from 'path'

class Log {
  public baseDirectory: string
  public fileName: string
  public linePrefix: string

  public today: Date = new Date()

  constructor() {
    const date = `${this.today.getFullYear()}-${this.today.getMonth()}-${this.today.getDay()}`
    const time = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`

    this.baseDirectory = path.join(__dirname, '../../../.logs/')
    this.fileName = `${date}.log`
    this.linePrefix = `[${date} ${time}]`
  }

  public info(message:string):void {
    this.log('INFO', message)  
  }

  public warn(message:string):void {
    this.log('WARNING', message)
  }

  public error(message:string):void {
    this.log('ERROR', message)
  }

  private log(key:string, message:string):void {
    key = key.toUpperCase()

    fs.open(`${this.baseDirectory}${this.fileName}`, 'a', (err: NodeJS.ErrnoException | null, file:any) => {
      if(err) throw new Error(err.message)
      fs.appendFile(file, `${this.linePrefix} [${key}] ${message}\n`, (err: NodeJS.ErrnoException | null) => {
        if(err) throw new Error(err.message)
        fs.close(file, (err:NodeJS.ErrnoException | null) => {
          if(err) throw new Error(err.message)
        })
      })
    })
  }
}

export default new Log()