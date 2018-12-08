import { createLogger, transports, format } from 'winston';

import { isProd } from './environment';

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.simple()
  ),
  transports: [
    new transports.Console({
      level: isProd() ? 'error' : 'debug'
    }),
    new transports.File({
      level: 'debug',
      filename: 'debug.log'
    })
  ]
});

if (!isProd()) {
  logger.debug('Logger initialization completed');
}

export default logger;
