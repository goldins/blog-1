import { NextApiRequest, NextApiResponse } from 'next';
import { client, q } from './base';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const squeakeasy = require('squeakeasy');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = squeakeasy.generateSecret({ length: 1 });
  res.statusCode = 200;

  const r = await client.query(
    q.Create(q.Collection('temp_secrets'), { data: { user: 'unique_id', value: secret.base32 } })
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - ref.id
  res.json({ data: secret.ascii, id: r.ref.id });
};

export default handler;
