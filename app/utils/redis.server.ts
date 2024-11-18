import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://allowed-seal-23111.upstash.io',
  token: 'AVpHAAIjcDFmMTUxYzg5YTk0ZDk0NzAzYmE4Njg5OTYyNzFkMGNkMHAxMA',
});

export { redis };
