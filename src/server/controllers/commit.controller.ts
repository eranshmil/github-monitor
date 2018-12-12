import { Request, Response, NextFunction } from 'express';

import { CommitModel } from '../models';

/**
 * Commit list route.
 *
 * @param req Request information.
 * @param res Response information.
 */
export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const commits = await CommitModel.find().sort('-committedAt');

    res.status(200).json({ commits });
  } catch (error) {
    next(error);
  }
}
