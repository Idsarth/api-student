// Import envs
import { HOST, PORT } from './src/env'

// Import server
import { Server } from './src/server'

// Import database
import { Mongoose } from './src/api/database/mongoose'

const serve = new Server()
const mongo = new Mongoose()
const main = async ():Promise<void> => {
  mongo.connect()
  serve.listen(Number(PORT), HOST, () => {
    console.log(`🧨 Server is listening on port ${PORT} http://${HOST}:${PORT}`)
  })
}

main()
