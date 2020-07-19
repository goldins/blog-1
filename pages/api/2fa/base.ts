import faunadb, { Client } from 'faunadb';

// your secret hash
const secret = (process.env as NodeJS.ProcessEnv).TWO_FA_DB_SECRET;

if (!secret) {
  throw new Error('missing secret');
}

const q = faunadb.query;
const client: Client = new faunadb.Client({ secret });

export { q, client };
