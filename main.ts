// Import envs
import { HOST, PORT } from './src/env'

// Import server
import { Server } from './src/server'

/*
* function main
*/
const main = async ():Promise<void> => {
  const serve = new Server()
  serve.listen(Number(PORT), Number(HOST), () => {
    console.log(`Server is listening on port 🧨 ${PORT} http://${HOST}:${PORT}`)
  })
}

main()
