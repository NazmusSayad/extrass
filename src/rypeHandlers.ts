import { GetErrorInfoHandler } from 'req-error'
import { RypeError, RypeTypeError, RypeRequiredError } from 'rype'

const rypeHandlers: GetErrorInfoHandler[] = [
  function (err) {
    if (!(err instanceof RypeError)) return

    if (err instanceof RypeTypeError) {
    }

    if (err instanceof RypeRequiredError) {
    }
  },
]
export default rypeHandlers
