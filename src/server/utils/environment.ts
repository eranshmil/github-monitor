import * as fs from 'fs';

import * as dotenv from 'dotenv';

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
} else {
  console.error('Environment file (.env) is missing.');
  process.exit(1);
}

const { env: environment } = process;

export function isProd(): boolean {
  return environment.NODE_ENV === 'production';
}

if (!environment.MONGODB_URI) {
  console.error('No mongo connection credentials.');
  process.exit(1);
}

export default environment;
