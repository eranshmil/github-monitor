import app from './app';

import logger from './utils/logger';
import environment from './utils/environment';

const server = app.listen(environment.PORT, () => {
  logger.debug(`Listening on port ${environment.PORT}`);
});

export default server;
