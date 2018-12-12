import { Request, Response, NextFunction } from 'express';

import { ForkModel } from '../models';

/**
 * Fork list route.
 *
 * @param req Request information.
 * @param res Response information.
 */
export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const forks = await ForkModel.find().sort('-forkedAt');

    res.status(200).json({ forks });
  } catch (error) {
    next(error);
  }
}
