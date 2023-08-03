import { Response } from 'express'
import { DefaultErrorMethod, DefaultSuccessMethod } from './types'

export const successMethod: DefaultSuccessMethod = function (
  this: Response,
  data
) {
  const resData = { status: 'success', data }
  this.json(resData)
  return resData
}

export const errorMethod: DefaultErrorMethod = function (
  this: Response,
  message
) {
  if (!this._statusCodeInitialized || this.statusCode < 400) this.status(400)
  const status = this.statusCode < 500 ? 'fail' : 'error'
  const resData = { status, message }
  this.json(resData)
  return resData
}
