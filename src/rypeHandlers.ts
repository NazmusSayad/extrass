import { GetErrorInfoHandler } from 'req-error'

const rypeHandlers: GetErrorInfoHandler[] = [
  function (err) {
    if (err.isRypeClientError) {
      return [err.message, 400]
    }
  },
]
export default rypeHandlers
