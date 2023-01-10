import { Express } from 'express'
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
}

export {
  default as typeCheck,
  TypeCheckInput,
  AllowedTypes,
} from './typeCheck.js'
export default (
  app: Express,
  { ping, errorMsgs, formatJSON }: ConfigOptions = {}
) => {
  app.response.success = successMethod
  app.request.getBody = getBodyMethod

  if (ping && typeof ping === 'string') app.use(ping, pingController)
  handleError(app, errorMsgs, formatJSON)
}

export { GetBodyMethod, SussessMethod }
export type ConfigOptions = {
  ping?: string
  errorMsgs?: Parameters<typeof handleError>[1]
  formatJSON?: Parameters<typeof handleError>[2]
}
