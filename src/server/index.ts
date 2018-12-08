import app from './app';

import environment from './utils/environment';

const server = app.listen(environment.PORT, () => {
  console.log(`Listening on port ${environment.PORT}`);
});

export default server;
