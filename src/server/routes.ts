import * as express from 'express';
import * as path from 'path';

import { isProd } from './utils';
import * as webhookController from './controllers/webhook.controller';
import * as commitController from './controllers/commit.controller';
import * as forkController from './controllers/fork.controller';
import * as issueController from './controllers/issue.controller';

const routes = express.Router();

// Github webhook route.
routes.post('/webhook', webhookController.webhook);

// Commit routes.
routes.get('/commit', commitController.list);

// Fork routes.
routes.get('/fork', forkController.list);

// Issue routes.
routes.get('/issue', issueController.list);

// Serving the angular client for the heroku deployment.
if (isProd()) {
  routes.use(express.static(path.join(__dirname, 'client')));

  routes.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });
}

export default routes;
