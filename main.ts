// Import envs
import { HOST, PORT } from '@env'

// Import server
import { Server } from '@server'

// Import database
import { Mongoose } from '@providers/database'

const serve = new Server()
const mongo = new Mongoose()
const main = async ():Promise<void> => {
  await mongo.connect()
  serve.listen(Number(PORT), HOST, () => {
    console.log(`🧨 Server is listening on port ${PORT} https://${HOST}:${PORT}`)
  })
}

main()
