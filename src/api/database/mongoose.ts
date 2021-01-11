import mongoose, { ConnectOptions } from 'mongoose'

// Import middlew
import { LogMiddlew as Log } from '../middlew'

// Import variables
import { 
  MONGO_DATABASE,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_USER
} from '../../env'

export class Mongoose {
  private URI:string
  private options:ConnectOptions

  constructor() {
    this.URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    }
  }

  async connect():Promise<void> {
    try {
      await mongoose.connect(this.URI, this.options)
      console.log('🎉 Database is connected')
    } catch (error) {
      console.log('💣 Error connecting to database')
      process.exit(1)
    }
  }
}