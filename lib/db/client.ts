import faunadb from 'faunadb';

const q = faunadb.query;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dbSecret = process.env.DB_SECRET!;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const dbDomain = process.env.DB_DOMAIN!;

const client = new faunadb.Client({
  secret: dbSecret,
  domain: dbDomain,
  scheme: 'https',
});

export { client, q };
