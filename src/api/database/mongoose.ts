import mongoose, { ConnectOptions, CallbackError } from 'mongoose'

// Import middlew
import { LogMiddlew as Log } from '../middlew'

// Import variables
import { MONGO_URI } from '../../env'

export class Mongoose {
  private URI:string
  private options:ConnectOptions

  constructor() {
    this.URI = MONGO_URI
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    }
  }

  async connect():Promise<void> {
    mongoose.connect(this.URI, this.options, (err: CallbackError) => {
      if(err) {
        Log.error('Error connecting to database')
        process.exit(0)
      }
      console.log('🎉 Database is connected')
    })
  }
}