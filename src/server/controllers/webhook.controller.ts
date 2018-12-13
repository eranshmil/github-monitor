import * as crypto from 'crypto';
import { Request, Response } from 'express';

import { Commit, Fork, Issue } from '@common/entities';

import { CommitModel, ForkModel, IssueModel } from '../models';
import environment from '../utils/environment';
import logger from '../utils/logger';

enum EventType {
  PUSH = 'push',
  FORK = 'fork',
  ISSUES = 'issues'
}

/**
 * Verify that the request came from github.
 *
 * @param signature Webhook signature for verification.
 * @param payload Payload of the request.
 */
function validateSignature(signature: string, payload: any): boolean {
  const computedSignature = crypto
    .createHmac('sha1', environment.GITHUB_SECRET)
    .update(JSON.stringify(payload))
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(`sha1=${computedSignature}`)
    );
  } catch (error) {
    logger.error(`Failed validating signature: ${error}`);

    return false;
  }
}

/**
 * Validate that the requests has all required data.
 *
 * @param req Webhook request object.
 */
function validateRequest(req: Request): boolean {
  const id = req.header('x-github-delivery');
  const event = req.header('x-github-event');
  const signature = req.header('x-hub-signature');
  const { body } = req;

  return id && event && signature && body && validateSignature(signature, body);
}

/**
 * Store commit data in db.
 *
 * @param data Event information.
 */
function handlePushEvent(data: any) {
  const { repository, commits } = data;

  if (!commits || !Array.isArray(commits) || !repository) {
    return;
  }

  const commitModels: Commit[] = commits.map((commit: any) =>
    Commit.fromWebhook(commit, repository)
  );

  CommitModel.create(commitModels).catch(error =>
    logger.error(`creating new commits failed: ${error}`)
  );
}

/**
 * Store fork data in db.
 *
 * @param data Event information.
 */
function handleForkEvent(data: any) {
  const { repository, forkee } = data;

  if (!forkee || !repository) {
    return;
  }

  const forkModel = Fork.fromWebhook(forkee, repository);

  ForkModel.create(forkModel).catch(error =>
    logger.error(`creating new fork failed: ${error}`)
  );
}

/**
 * Store issue data in db.
 *
 * @param data Event information.
 */
function handleIssuesEvent(data: any) {
  const { repository, issue } = data;

  if (!issue || !repository) {
    return;
  }

  const issueModel = Issue.fromWebhook(issue, repository);

  // Will update issue's state, and create if not exists.
  IssueModel.findOneAndUpdate({ issueId: issue.id }, issueModel, {
    upsert: true
  }).catch(error => logger.error(`creating/updating issue failed: ${error}`));
}

/**
 * Global events handler.
 *
 * @param event Incoming event type.
 * @param data  Event information.
 */
function handleEvent(event: string, data: any) {
  switch (event) {
    case EventType.PUSH:
      handlePushEvent(data);
      break;

    case EventType.FORK:
      handleForkEvent(data);
      break;

    case EventType.ISSUES:
      handleIssuesEvent(data);
      break;
  }
}

/**
 * /webhook/ route.
 *
 * @param req Request information.
 * @param res Response information.
 */
export function webhook(req: Request, res: Response) {
  if (!validateRequest(req)) {
    return res.status(400).send({
      error: 'Invalid request data.'
    });
  }

  handleEvent(req.header('x-github-event'), req.body);

  res.status(200).send();
}
