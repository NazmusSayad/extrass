import { Express } from 'express'
import { handleError } from 'req-error'

import getBodyMethod from './getBody'
import successMethod from './success'
import pingController from './ping'
import { GetBodyMethod, MasterOptions, DefaultSussessMethod } from './types'

import 'req-error/global'
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
export * from 'req-error'

export default (app: Express, options: MasterOptions = {}) => {
  // Add methods
  app.request.getBody = getBodyMethod
  app.response.success = options.successMethod ?? successMethod

  // Add ping route
  if (options.ping && typeof options.ping === 'string') {
    app.use(options.ping, pingController)
  }

  // Handle errors
  handleError(app, options.errorMessages, options.formatError)
}
