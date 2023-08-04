import {
  GetBodyMethod,
  DefaultErrorMethod,
  DefaultSuccessMethod,
} from './types'
import { ReqError as RequestError } from 'req-error'
import extrass from './extrass'
import rype from 'rype'

try {
  globalThis.r = rype
  globalThis.ReqError = RequestError
} catch {
  try {
    global.r = rype
    global.ReqError = RequestError
  } catch {}
}

declare global {
  var r: typeof rype
  var ReqError: typeof RequestError

  namespace Express {
    export interface Response {
      error: DefaultErrorMethod
      success: DefaultSuccessMethod
      _statusCodeInitialized: boolean
    }
    export interface Request {
      getBody: GetBodyMethod
    }
  }
}

export * from 'rype'
export * from 'req-error'
export default extrass
export * from './types'
