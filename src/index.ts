import {
  GetBodyMethod,
  DefaultSuccessMethod,
  DefaultErrorMethod,
} from './types'
// import { r as rype } from 'rype'
import { ReqError as RequestError } from 'req-error'

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
  var ReqError: typeof RequestError
  var r: typeof rype

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

export * from './types'
// export * from 'rype'
export * from 'req-error'
export { default } from './extrass'
