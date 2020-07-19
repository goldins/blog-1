import { NextApiRequest, NextApiResponse } from 'next';
import { client, q } from './base';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const squeakeasy = require('squeakeasy');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({ error: 'Something went wrong.' });
    return;
  }

  if (!req.body) {
    res.statusCode = 400;
    res.json({ error: 'Missing code.' });
    return;
  }

  const body = JSON.parse(req.body);

  const r = await client.query(q.Ref(q.Collection('temp_secrets'), body.uuid));

  const v = squeakeasy.verify({ digits: 1, secret: body.code, data: body.code });
  res.statusCode = 200;

  res.json({ r, v });
};

export default handler;
