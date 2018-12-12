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
    mongoose.connection.once('error', error => {
      logger.error(`mongo connection error: ${error}`);

      process.exit(1);
    });

    // Show extra mongo logs.
    if (!isProd()) {
      mongoose.set('debug', true);
    }

    // Remove _id and __v from schema jsons.
    mongoose.set('toJSON', {
      transform: (doc: any, ret: any, options: any) => {
        delete ret._id;
        delete ret.__v;

        return ret;
      }
    });
  }

  /**
   * Connect to mongo server.
   */
  public async connect() {
    const instance = await mongoose.connect(
      environment.MONGODB_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        bufferMaxEntries: 0
      }
    );

    this._connection = instance.connection;
  }
}

export default new Mongo();
