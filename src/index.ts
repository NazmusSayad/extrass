import {
  GetBodyMethod,
  DefaultErrorMethod,
  DefaultSuccessMethod,
} from './types'
import { ReqError as RequestError } from 'req-error'
import extrass from './extrass'

try {
  // global.r = rype
  global.ReqError = RequestError
} catch {
  try {
    // globalThis.r = rype
    globalThis.ReqError = RequestError
  } catch {}
}

declare global {
  // var r: typeof rype
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

export default extrass
export * from './types'
export * from 'req-error'
