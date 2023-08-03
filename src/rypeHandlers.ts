import { RypeError, RypeTypeError, RypeRequiredError } from 'rype'
import { GetErrorInfoHandler } from 'req-error'

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
