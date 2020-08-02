import { NextApiRequest, NextApiResponse } from 'next';
import { generateSecret } from './lib';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = generateSecret();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - ref.id
  const ret = { data: secret };

  res.statusCode = 200;
  res.json(ret);
};

export default handler;
