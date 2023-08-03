import { Express } from 'express'
import pingController from './ping'
import getBodyMethod from './getBody'
import handleError from './handleError'
import { MasterOptions } from './types'
import { successMethod, errorMethod } from './customMethod'

export default (app: Express, options: MasterOptions = {}) => {
  app.request.getBody = getBodyMethod
  app.response.error = options.errorMethod ?? errorMethod
  app.response.success = options.successMethod ?? successMethod

  const rawStatus = app.response.status
  app.response.status = function (code: number) {
    this._statusCodeInitialized = true
    return rawStatus.bind(this)(code)
  }

  if (options.ping && typeof options.ping === 'string') {
    app.use(options.ping, pingController)
  }

  handleError(app, {
    messages: options.errorMessages,
    handlers: options.errorHandlers,
  })
}
