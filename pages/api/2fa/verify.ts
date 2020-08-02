import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from './lib';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({ error: 'Invalid endpoint.' });
    return;
  }

  if (!req.body) {
    res.statusCode = 400;
    res.json({ error: 'Missing body.' });
    return;
  }

  let secret: unknown;
  let token: unknown;
  let timeStep: unknown;
  try {
    ({ secret, token, timeStep } = JSON.parse(req.body));
  } catch (e) {
    res.statusCode = 400;
    res.json({ error: e.message });
    return;
  }

  if (!secret || !token || typeof timeStep !== 'number') {
    res.statusCode = 400;
    res.json('Missing/Invalid argument(s)');
    return;
  }

  if (timeStep <= 0) {
    res.statusCode = 400;
    res.json('Step must be greater than 0');
    return;
  }

  const verified = verify('' + secret, '' + token, timeStep);

  if (verified) {
    res.statusCode = 200;
    res.json({ verified: true });
    return;
  } else {
    res.statusCode = 400;
    res.json({ verified: false, error: 'invalid' });
    return;
  }
};

export default handler;
