import { Request, Response, NextFunction } from 'express';

import { IssueModel } from '../models';

/**
 * Issue list route.
 *
 * @param req Request information.
 * @param res Response information.
 */
export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const issues = await IssueModel.find().sort('-issuedAt');

    res.status(200).json({ issues });
  } catch (error) {
    next(error);
  }
}
