import express, { Express } from 'express'
import { handleError } from 'req-error'

import getBodyMethod, { GetBodyMethod } from './getBody.js'
import successMethod, { SussessMethod } from './success.js'
import pingController from './ping.js'

import 'req-error/global'
declare global {
  namespace Express {
    export interface Response {
      success: SussessMethod
    }
    export interface Request {
      getBody: GetBodyMethod
    }
  }

  export interface Express {
    test: SussessMethod
  }
}

export default ({ ping = '' }: ConfigOptions = {}): Express => {
  const app = express()

  app.response.success = successMethod
  app.request.getBody = getBodyMethod

  if (ping) app.use(ping, pingController)

  return app
}

export { GetBodyMethod, SussessMethod, handleError }
export type ConfigOptions = {
  ping?: string
}
