import { Express } from 'express'
import { handleError } from 'req-error'
import * as utils from './utils'

import getBodyMethod from './getBody'
import successMethod from './success'
import pingController from './ping'
import { GetBodyMethod, MasterOptions, DefaultSussessMethod } from './types'

import 'req-error/global'
import checkType from './checkType/index.js'
declare global {
  namespace Express {
    export interface Response {
      success: DefaultSussessMethod
    }
    export interface Request {
      getBody: GetBodyMethod
    }
  }
}

export * from './types'
export { default as checkType } from './checkType/index.js'

export default (app: Express, options: MasterOptions = {}) => {
  // Add methods
  app.request.getBody = getBodyMethod
  app.response.success = utils.isFunction(options.successMethod)
    ? (options.successMethod as DefaultSussessMethod)
    : successMethod

  // Add ping route
  if (options.ping && typeof options.ping === 'string') {
    app.use(options.ping, pingController)
  }

  // Handle errors
  handleError(app, options.errorMessages, options.formatError)
}
