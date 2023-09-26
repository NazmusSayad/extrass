import {
  GetBodyMethod,
  DefaultErrorMethod,
  DefaultSuccessMethod,
} from './types'
import extrass from './extrass'
import { ReqError as RequestError } from 'req-error'

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
export { extrass as createExtrass }

const instance = extrass()
export default instance.handle
export const errorManager = instance.errorManager
