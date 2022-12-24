import { Response } from 'express'

const successMethod: SussessMethod = function (
  this: Response,
  data: any,
  code = 200
) {
  const resData = { status: 'success', data }
  this.status(code).json(code === 204 ? null : resData)
  return resData
}

export default successMethod
export type SussessMethod = <Data extends unknown>(
  data: Data,
  code?: number
) => { status: string; data: Data }
