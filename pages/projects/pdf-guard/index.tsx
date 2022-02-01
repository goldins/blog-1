/** @jsxImportSource @emotion/react */
import { FormEventHandler, useState } from 'react';
import { Button, FormContainer, TextField } from '../../../components/General';
import { CheckboxField } from '../../../components/General/Inputs/CheckboxField';
import { Tooltip } from '../../../components/General/Tooltip';

const FORM_LABEL_WIDTH = '25vw';
const FORM_INPUT_WIDTH = '25vw';

interface FormInfo {
  name: string;
  agency: string;
  company: string;
  role: string;
  salaryMin: string;
  equity: string;
  remote: true;
}

const PdfGuard = () => {
  const [info, setInfo] = useState<FormInfo>({
    name: '',
    agency: '',
    company: '',
    role: '',
    salaryMin: '',
    equity: '',
    remote: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormInfo, string>>>({});
  const [pdfUrl, setPdfUrl] = useState('');

  const patchInfo = <T extends keyof FormInfo>(key: T, value: string) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [key]: null,
    }));
    setInfo((currentInfo) => ({
      ...currentInfo,
      [key]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const submitResp = await fetch('/api/pdf-guard/submit', {
      method: 'POST',
      body: JSON.stringify(info),
    });

    if (submitResp.status === 400) {
      setErrors(await submitResp.json());
    } else {
      const { token = '' } = await submitResp.json();
      const resp = await fetch('/api/pdf-guard/pdf', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ token }),
      });

      const pdfTxt = await resp.text();

      const cleaned = window.atob(
        pdfTxt.slice('data:application/pdf;charset=utf-8;base64,'.length, Infinity)
      );

      const blob = new Blob([cleaned], { type: 'application/pdf' });

      setPdfUrl(window.URL.createObjectURL(blob));
      // const tab = window.open();
      // if (tab) {
      //  tab.location.href = fileURL;
      // }
    }
  };

  return pdfUrl ? (
    <iframe css={{ width: '100vw', height: '100vh' }} src={pdfUrl} />
  ) : (
    <FormContainer onSubmit={handleSubmit}>
      <TextField
        sz="md"
        label="Name"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.name ?? 'Your name.'}
        helpIntent={errors.name ? 'error' : 'none'}
        name="name"
        value={info.name}
        onChange={(e) => patchInfo('name', e.target.value)}
      />
      <TextField
        sz="md"
        label="Recruitment Firm"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.agency ?? ''}
        helpIntent={errors.agency ? 'error' : 'none'}
        name="agency"
        value={info.agency}
        onChange={(e) => patchInfo('agency', e.target.value)}
      />
      <TextField
        sz="md"
        label="Company"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.company ?? 'Company looking to fill this role.'}
        helpIntent={errors.company ? 'error' : 'none'}
        name="company"
        value={info.company}
        onChange={(e) => patchInfo('company', e.target.value)}
      />
      <TextField
        sz="md"
        label="Position/Role"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.role ?? "Role or roles you're looking to fill."}
        helpIntent={errors.role ? 'error' : 'none'}
        name="role"
        value={info.role}
        onChange={(e) => patchInfo('role', e.target.value)}
      />
      <TextField
        sz="md"
        label="Salary min"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.salaryMin ?? 'USD'}
        helpIntent={errors.salaryMin ? 'error' : 'none'}
        name="salaryMin"
        value={info.salaryMin}
        onChange={(e) => patchInfo('salaryMin', e.target.value)}
      />
      <TextField
        sz="md"
        label="Equity"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.equity ?? 'USD or %'}
        helpIntent={errors.equity ? 'error' : 'none'}
        name="equity"
        value={info.equity}
        onChange={(e) => patchInfo('equity', e.target.value)}
      />
      <Tooltip content="Remote-only GMT-5 ± 1" position="right">
        <CheckboxField
          sz="md"
          name="remote"
          label="Remote?"
          labelWidth={FORM_LABEL_WIDTH}
          checked={info.remote}
          readOnly
          helpText="Only looking for remote positions."
        />
      </Tooltip>
      <Button sz="lg" type="submit">
        Submit
      </Button>
    </FormContainer>
  );
};
export default PdfGuard;
