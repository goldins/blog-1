import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from '../2fa/lib/index';
import pdfFile from './PDF14.pdf';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({ error: 'Invalid endpoint.' });
    return;
  }

  // todo: fetch token from db!
  const { token = '', secret = '' } = JSON.parse(req.body);

  if (!token) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized.' });
  }

  const verified = await verify(secret, token, 5, 1);

  if (!verified) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized.' });
  }

  const pdfB64 = pdfFile.slice('data:application/pdf;charset=utf-8;base64,'.length, Infinity);

  res.setHeader('Content-disposition', 'attachment; filename="file.pdf"');
  res.setHeader('Content-Type', 'application/pdf; charset=iso-8859-1');

  try {
    res.end(pdfB64, 'binary');
  } catch {
    res.removeHeader('Content-disposition');
    res.removeHeader('Content-Type');
    res.statusCode = 500;
    res.json({ error: 'Server error!' });
  }

  return;
};

export default handler;
