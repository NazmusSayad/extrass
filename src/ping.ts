import { Request, Response } from 'express'

const pingController = (req: Request, res: Response) => {
  res.status(200).end()
}

export default pingController
