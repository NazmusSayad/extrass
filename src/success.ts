import { Response } from 'express'

const successMethod: SussessMethod = function (this: Response, data) {
  const resData = { status: 'success', data }
  this.json(resData)
  return resData
}

export default successMethod
export type SussessMethod = <Data extends unknown>(
  data: Data
) => { status: string; data: Data }
