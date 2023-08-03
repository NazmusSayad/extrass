import { GetErrorInfoHandler } from 'req-error'
import { RypeTypeError, RypeRequiredError } from 'rype'

const rypeHandlers: GetErrorInfoHandler[] = [
  function (err) {
    if (err instanceof RypeTypeError || err instanceof RypeRequiredError) {
      return [err.message, 400]
    }
  },
]
export default rypeHandlers
