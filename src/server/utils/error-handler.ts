import { Request, Response, NextFunction } from 'express';

import logger from './logger';

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);

  res.status(500).send({ error: 'Internal server error!' });
}

export default errorHandler;
