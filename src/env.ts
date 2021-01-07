import { config } from 'dotenv'
import path from 'path'

config({ path: path.join(process.cwd(), `.env${process.env.NODE_ENV !== 'production' ? process.env.NODE_ENV : ''}`) })

/**
 * Environments variables
 */

 export const NODE_ENV = process.env.NODE_ENV || 'development'
 export const HOST = process.env.HOST || '0.0.0.0'
 export const PORT = process.env.PORT || 4200

 export const SECRET_KEY = process.env.SECRET_KEY as string
 export const MONGO_URI = process.env.MONGO_URI as string
 export const REDIS_URI = process.env.REDIS_URI as string