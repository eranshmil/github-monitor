import * as express from 'express';
import * as path from 'path';

import { isProd } from './utils/environment';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => {
  console.log(req.body);
});

// Serving the angular client for heroku deploy
if (isProd()) {
  app.use(express.static(path.join(__dirname, '../client')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

export default app;
