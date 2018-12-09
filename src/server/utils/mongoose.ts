import * as mongoose from 'mongoose';

import environment, { isProd } from './environment';
import logger from './logger';

class Mongo {
  private _connection: mongoose.Connection;

  constructor() {
    this._init();
  }

  /**
   * Initialize connection.
   */
  private _init() {
    // Listen to error event.
    mongoose.connection.on('error', error => {
      logger.error(`mongo connection error: ${error}`);
    });

    // Show extra mongo logs.
    if (!isProd()) {
      mongoose.set('debug', true);
    }
  }

  /**
   * Connect to mongo server.
   */
  public connect() {
    mongoose
      .connect(
        environment.MONGODB_URI,
        { useNewUrlParser: true }
      )
      .then(instance => (this._connection = instance.connection));
  }
}

export default new Mongo();
