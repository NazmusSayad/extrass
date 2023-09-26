import { ErrorManager, NotFoundError } from 'req-error'
import { Express, Request, Response, NextFunction } from 'express'

export default (app: Express, manager: ErrorManager) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError())
  })

  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    try {
      const [message, _statusCode] = manager.getErrorInfo(err)
      const statusCode = res._statusCodeInitialized
        ? res.statusCode
        : _statusCode

      const resObj: any = { message }
      if (process.env.NODE_ENV === 'development') {
        Object.assign(resObj, { error: err, stack: err.stack })
      }

      if (res.headersSent) {
        return console.warn('Headers already sent!')
      }

      res.status(statusCode).error(resObj)
    } catch (error) {
      res.status(500).json({
        status: "Error inside 'req-error', while handling another error",
        error,
        npm: 'https://www.npmjs.com/package/req-error',
        github: 'https://github.com/NazmusSayad/req-error',
      })
    }
  })
}
