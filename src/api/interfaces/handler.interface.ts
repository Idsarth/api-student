import { Router } from 'express'

export interface IHandler {
  path: string
  router: Router
}
