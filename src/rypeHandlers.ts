import { GetErrorInfoHandler } from 'req-error'

const rypeHandlers: GetErrorInfoHandler[] = [
  function (err) {
    if (err.isRypeError && err.isRypeClientError) {
      return [err.message, 400]
    }
  },
]
export default rypeHandlers
