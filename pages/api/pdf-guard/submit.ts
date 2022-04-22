import { NextApiRequest, NextApiResponse } from 'next';
import { COLLECTION } from './consts';
import { generateSecret } from '../2fa/lib';
import { generateToken } from '../../../lib/2fa';
import { TIME_STEP } from '../../../lib/2fa/consts';
import { client, q } from '../../../lib/db/client';

class RequestData {
  public static readonly REQUIRED: ('name' | 'email' | 'company' | 'salaryMin')[] = [
    'name',
    'email',
    'company',
    'salaryMin',
  ];

  public constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly agency: string,
    private readonly company: string,
    private readonly role: string,
    private readonly salaryMin: number,
    private readonly salaryMax: number,
    private readonly other: string,
    private readonly equity: string,
    private readonly bonus: string,
    private readonly remote: boolean
  ) {}

  public validate = (): Record<string, string> | null => {
    const errors: Record<string, string> = {};
    for (const requiredField of RequestData.REQUIRED) {
      if (!this[requiredField]) {
        errors[requiredField] = 'Required.';
      }
    }

    if (isNaN(this.salaryMin)) {
      errors.salaryMin = 'Malformed.';
    } else if (this.salaryMin < 50_000) {
      errors.salaryMin =
        'Below my range, but if you think I may still be interested, please email me.';
    }

    if (isNaN(this.salaryMax)) {
      errors.salaryMax = 'Malformed.';
    } else if (this.salaryMax > 50_000_000) {
      errors.salaryMax = 'Yeah, okay.';
    }

    if (!this.remote) {
      errors.remote = 'Nice try.';
    }

    return Object.keys(errors).length ? errors : null;
  };

  public json = () => ({
    name: this.name,
    email: this.email,
    agency: this.agency,
    company: this.company,
    role: this.role,
    salaryMin: this.salaryMin,
    salaryMax: this.salaryMax,
    equity: this.equity,
    other: this.other,
    bonus: this.bonus,
    remote: this.remote,
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({ error: 'Invalid endpoint.' });
    return;
  }
  const { name, email, agency, company, role, salaryMin, salaryMax, other, equity, bonus, remote } =
    JSON.parse(req.body);

  const formattedMin = Number(salaryMin.replace(/[,.]/g, '').replace('k', '000'));
  const formattedMax = Number(salaryMax.replace(/[,.]/g, '').replace('k', '000'));

  const data = new RequestData(
    name,
    email,
    agency,
    company,
    role,
    formattedMin,
    formattedMax,
    other,
    equity,
    bonus,
    remote
  );

  const errors = data.validate();

  if (!errors) {
    const secret = generateSecret();
    const token = generateToken(secret, Date.now() / TIME_STEP / 1000);

    const resp = await client.query(
      q.Create(q.Collection(COLLECTION), { data: { ...data.json(), secret } })
    );

    // todo: find a better way to get the ID.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const refId = resp?.ref?.id;

    res.statusCode = 200;
    res.json({ token, id: refId });
  } else {
    res.statusCode = 400;
    res.json(errors);
  }

  return;
};

export default handler;
