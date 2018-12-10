import { Request, Response } from 'express';

import { IssueModel } from '../models';

/**
 * Issue list route.
 *
 * @param req Request information.
 * @param res Response information.
 */
export async function list(req: Request, res: Response) {
  const issues = await IssueModel.find();

  res.status(200).json({ issues });
}
