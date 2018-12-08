import * as mongoose from 'mongoose';

import environment from './environment';
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
      logger.error(`Mongo connection error: ${error}`);
    });

    // Show extra mongo logs.
    mongoose.set('debug', true);
  }

  /**
   * Connect to mongo server.
   */
  public connect(): this {
    mongoose.connect(
      environment.MONGODB_URI,
      { useNewUrlParser: true }
    );

    return this;
  }
}

export default new Mongo();
