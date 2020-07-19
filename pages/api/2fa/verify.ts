import { NextApiRequest, NextApiResponse } from 'next';
import speakeasy from 'speakeasy';
import { DIGITS, ENCODING, STEP } from '../../../components/OneTwoFA/lib/consts';

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

  const verified = speakeasy.totp.verify({
    digits: DIGITS,
    step: STEP,
    secret: body.secret,
    encoding: ENCODING,
    token: body.token
  });

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
