import { NextApiRequest, NextApiResponse } from 'next';
import pdfFile from '../../../assets/pdf-guard/PDF14.pdf';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({ error: 'Invalid endpoint.' });
    return;
  }

  // expect req.body to contain token
  const { token = '' } = JSON.parse(req.body);

  if (!token) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized.' });
  }

  res.setHeader('Content-disposition', 'attachment; filename="file.pdf"');
  res.setHeader('Content-Type', 'application/pdf; charset=binary');

  try {
    res.end(pdfFile, 'binary');
  } catch {
    res.removeHeader('Content-disposition');
    res.removeHeader('Content-Type');
    res.statusCode = 500;
    res.json({ error: 'Server error!' });
  }

  return;
};

export default handler;
