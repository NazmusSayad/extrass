import { Request } from 'express'
import { GetBodyMethod } from './types'

const getBodyMethod: GetBodyMethod = function (this: Request, ...fields) {
  const newObj: any = {}

  for (let field of fields) {
    const value = this.body[field]
    if (value !== undefined) newObj[field] = value
  }
  return newObj
}

export default getBodyMethod
