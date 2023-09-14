import {
  GetBodyMethod,
  DefaultErrorMethod,
  DefaultSuccessMethod,
} from './types'
import { ReqError as RequestError } from 'req-error'
import extrass from './extrass'

try {
  globalThis.ReqError = RequestError
} catch {
  try {
    global.ReqError = RequestError
  } catch {}
}

declare global {
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

export * from 'req-error'
export * from './types'
export default extrass
