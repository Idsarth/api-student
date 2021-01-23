import mongoose, { ConnectOptions } from 'mongoose'

// Import middlew
import { LogMiddlew as Log } from '../../../common/middlew'

// Import variables
import {
  MONGO_DATABASE,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_USER,
  NODE_ENV
} from '../../../env'

export class Mongoose {
  private readonly URI:string
  private readonly options:ConnectOptions

  constructor() {
    this.URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  }

  async connect():Promise<void> {
    try {
      await mongoose.connect(this.URI, this.options)
      console.log(`🎉 Database is connected in ${NODE_ENV.toLowerCase()}`)
    } catch (error) {
      console.log('💣 Error connecting to database')
      process.exit(1)
    }
  }
}
