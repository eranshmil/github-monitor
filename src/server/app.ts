import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';

import { isProd } from './utils/environment';
import Mongo from './utils/mongoose';

import * as webhookController from './controllers/webhook';
import * as commitController from './controllers/commit.controller';
import * as forkController from './controllers/fork.controller';
import * as issueController from './controllers/issue.controller';

const app = express();

// Apply express middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to mongo server.
Mongo.connect();

// Github webhook route.
app.post('/webhook', webhookController.webhook);

// Commit routes.
app.get('/commit', commitController.list);

// Fork routes.
app.get('/fork', forkController.list);

// Issue routes.
app.get('/issue', issueController.list);

// Serving the angular client for the heroku deployment.
if (isProd()) {
  app.use(express.static(path.join(__dirname, 'client')));

  app.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
  });
} else {
  // Not needed in production, both client and server hosted in heroku.
  app.use(cors());
}

export default app;
