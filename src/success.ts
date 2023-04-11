import { Response } from 'express'
import { DefaultSussessMethod } from './types'

const successMethod: DefaultSussessMethod = function (this: Response, data) {
  const resData = { status: 'success', data }
  this.json(resData)
  return resData
}

export default successMethod
