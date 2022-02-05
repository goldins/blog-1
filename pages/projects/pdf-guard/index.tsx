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

  const patchInfo = <T extends keyof FormInfo>(key: T, value: unknown) => {
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
        name="name"
        label="Name"
        sz="md"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.name ?? 'Your name.'}
        helpIntent={errors.name ? 'error' : 'none'}
        value={info.name}
        onChange={(e) => patchInfo('name', e.target.value)}
      />
      <TextField
        name="agency"
        label="Recruitment Firm"
        sz="md"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.agency ?? ''}
        helpIntent={errors.agency ? 'error' : 'none'}
        value={info.agency}
        onChange={(e) => patchInfo('agency', e.target.value)}
      />
      <TextField
        name="company"
        label="Company"
        sz="md"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.company ?? 'Company looking to fill this role.'}
        helpIntent={errors.company ? 'error' : 'none'}
        value={info.company}
        onChange={(e) => patchInfo('company', e.target.value)}
      />
      <TextField
        name="role"
        label="Position/Role"
        sz="md"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.role ?? "Role or roles you're looking to fill."}
        helpIntent={errors.role ? 'error' : 'none'}
        value={info.role}
        onChange={(e) => patchInfo('role', e.target.value)}
      />
      <TextField
        name="salaryMin"
        label="Salary min"
        sz="md"
        labelWidth={FORM_LABEL_WIDTH}
        inputWidth={FORM_INPUT_WIDTH}
        helpText={errors.salaryMin ?? 'USD'}
        helpIntent={errors.salaryMin ? 'error' : 'none'}
        value={info.salaryMin}
        onChange={(e) => patchInfo('salaryMin', e.target.value)}
      />
      <Tooltip content="Remote-only GMT-5 ± 1" position="right">
        <CheckboxField
          name="remote"
          label="Remote?"
          css={{ alignSelf: 'center' }}
          sz="md"
          labelWidth={FORM_LABEL_WIDTH}
          readOnly
          checked={info.remote}
          helpText={errors.remote ?? 'Only looking for remote positions.'}
          helpIntent={errors.remote ? 'error' : 'none'}
        />
      </Tooltip>
      <Button sz="lg" type="submit">
        Submit
      </Button>
    </FormContainer>
  );
};

export default PdfGuard;
