import { Request } from 'express'

const getBodyMethod: GetBodyMethod = function (this: Request, ...fields) {
  const newObj: any = {}

  for (let field of fields) {
    const value = this.body[field]
    if (value !== undefined) newObj[field] = value
  }
  return newObj
}

export default getBodyMethod
export type GetBodyMethod = <T extends string[]>(
  ...fields: T
) => Record<T[number], any>
