import { Express, Request, Response } from 'express'

export type ConfigOptions = {
  ping?: string
}

type FieldsType = (string | string[])[]
declare global {
  namespace Express {
    export interface Response {
      success: Function
    }
    export interface Request {
      getFields(this: Request, ...fields: FieldsType): any
    }
  }
}

const successMethod = function (this: Response, data: any, code = 200) {
  const resData = { status: 'success', data }
  this.status(code).json(code === 204 ? null : resData)
  return resData
}

const getFieldsMethod = function (this: Request, ...fields: FieldsType) {
  const newObj: any = {}
  const fieldsFlat: string[] = fields
    .flat()
    .map((field) => field.split(' '))
    .flat()
    .filter((field) => field.trim())

  for (let field of fieldsFlat) {
    const value = this.body[field]
    if (value !== undefined) newObj[field] = value
  }
  return newObj
}

const pingController = (req: Request, res: Response) => {
  res.status(200).end()
}

export default (app: Express, { ping = '' }: ConfigOptions = {}): Express => {
  app.response.success = successMethod
  app.request.getFields = getFieldsMethod
  if (ping) app.use(ping, pingController)
  return app
}
