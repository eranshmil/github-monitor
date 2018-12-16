import * as express from 'express';
import * as cors from 'cors';

import { isProd } from './utils/environment';
import Mongo from './utils/mongoose';
import errorHandler from './utils/error-handler';
import routes from './routes';

const app = express();

// Apply express middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (!isProd()) {
  // Not needed in production, both client and server hosted in heroku.
  app.use(cors());
}

// Connect to mongo server.
Mongo.connect();

app.use(routes);
app.use(errorHandler);

export default app;
