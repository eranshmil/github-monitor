import * as fs from 'fs';

import * as dotenv from 'dotenv';

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}

const { env: environment } = process;

/**
 * Check if we are in production mode (heroku).
 */
export function isProd(): boolean {
  return environment.NODE_ENV === 'production';
}

if (!environment.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment.');
  process.exit(1);
}

if (!environment.GITHUB_SECRET) {
  console.error('GITHUB_SECRET is not defined in the environment.');
  process.exit(1);
}

export default environment;
