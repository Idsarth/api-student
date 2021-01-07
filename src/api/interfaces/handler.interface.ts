import { Router } from 'express'

interface Handler {
  path: string
  router: Router
}

export default Handler
