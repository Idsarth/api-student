import { config } from 'dotenv'
import path from 'path'

config({ path: path.join(process.cwd(), `.env${process.env.NODE_ENV !== 'production' ? `.${process.env.NODE_ENV}` : ''}`) })

/**
 * Environments variables
 */
 export const NODE_ENV = process.env.NODE_ENV as string
 export const HOST = process.env.HOST as string
 export const PORT = process.env.PORT as string

 export const SECRET_KEY = process.env.SECRET_KEY as string
 export const MONGO_URI = process.env.MONGO_URI as string
 export const REDIS_URI = process.env.REDIS_URI as string