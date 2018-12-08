import * as express from 'express';
import * as path from 'path';

import { isProd } from './utils/environment';
import Mongo from './utils/mongoose';

const app = express();

// Apply express middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route for the github webhooks.
app.post('/webhook', (req, res) => {
  console.log(req.body);
});

// Connect to mongo server.
Mongo.connect();

// Serving the angular client for the heroku deployment.
if (isProd()) {
  app.use(express.static(path.join(__dirname, '../client')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

export default app;
