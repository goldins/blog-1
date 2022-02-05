import { NextApiRequest, NextApiResponse } from 'next';

class RequestData {
  public static readonly REQUIRED: ('name' | 'company' | 'salaryMin')[] = [
    'name',
    'company',
    'salaryMin',
  ];

  public constructor(
    private readonly name: string,
    private readonly agency: string,
    private readonly company: string,
    private readonly role: string,
    private readonly salaryMin: number,
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
      errors.salaryMin = 'Too low.';
    }

    if (!this.remote) {
      errors.remote = 'Nice try.';
    }

    return Object.keys(errors).length ? errors : null;
  };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({ error: 'Invalid endpoint.' });
    return;
  }
  const { name, agency, company, role, salaryMin, equity, bonus, remote } = JSON.parse(req.body);

  const formattedSalary = Number(salaryMin.replace(/[,.]/g, '').replace('k', '000'));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = new RequestData(name, agency, company, role, formattedSalary, equity, bonus, remote);

  const errors = null; //  data.validate();

  if (!errors) {
    res.statusCode = 200;
    res.json({ token: 'token' });
  } else {
    res.statusCode = 400;
    res.json(errors);
  }

  return;
};

export default handler;
