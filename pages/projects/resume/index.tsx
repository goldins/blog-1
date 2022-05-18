/** @jsxImportSource @emotion/react */
import { FormEventHandler, useState } from 'react';
import { encode } from 'iconv-lite';
import {
  Button,
  FormContainer,
  TextField,
  CheckboxField,
  Tooltip,
  P,
  H2,
} from '../../../components';

const FORM_LABEL_WIDTH = '100%';
const FORM_INPUT_WIDTH = '100%';

interface FormInfo {
  name: string;
  email: string;
  agency: string;
  company: string;
  role: string;
  salaryMin: string;
  salaryMax: string;
  other: boolean;
  remote: true;
}

const PdfGuard = () => {
  const [info, setInfo] = useState<FormInfo>({
    name: '',
    email: '',
    agency: '',
    company: '',
    role: '',
    salaryMin: '',
    salaryMax: '',
    other: false,
    remote: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormInfo, string>>>({});

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
      const { token = '', id = '' } = await submitResp.json();
      const resp = await fetch('/api/pdf-guard/pdf', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ token, id }),
      });

      const pdfB64 = await resp.text();
      const pdfUtf8 = window.atob(pdfB64);
      const pdfBuffer = encode(pdfUtf8, 'ISO-8859-1');

      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });

      window.open(window.URL.createObjectURL(blob), '_blank');
    }
  };

  return (
    <>
      <H2>Please complete this form to continue.</H2>
      <FormContainer onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          sz="md"
          labelWidth={FORM_LABEL_WIDTH}
          inputWidth={FORM_INPUT_WIDTH}
          labelEllipsis
          helpText={errors.name ?? 'Your name.'}
          helpIntent={errors.name ? 'error' : 'none'}
          value={info.name}
          onChange={(e) => patchInfo('name', e.target.value)}
        />
        <TextField
          name="email"
          label="Email Address"
          placeholder="you@company.com"
          sz="md"
          type="email"
          labelWidth={FORM_LABEL_WIDTH}
          inputWidth={FORM_INPUT_WIDTH}
          labelEllipsis
          helpText={errors.email ?? ''}
          helpIntent={errors.email ? 'error' : 'none'}
          value={info.email}
          onChange={(e) => patchInfo('email', e.target.value)}
        />
        <TextField
          name="company"
          label="Company"
          sz="md"
          labelWidth={FORM_LABEL_WIDTH}
          inputWidth={FORM_INPUT_WIDTH}
          labelEllipsis
          helpText={errors.company ?? 'Company looking to fill this role.'}
          helpIntent={errors.company ? 'error' : 'none'}
          value={info.company}
          onChange={(e) => patchInfo('company', e.target.value)}
        />
        <TextField
          name="role"
          label="Role(s)"
          sz="md"
          labelWidth={FORM_LABEL_WIDTH}
          inputWidth={FORM_INPUT_WIDTH}
          labelEllipsis
          helpText={errors.role ?? 'Open position or positions.'}
          helpIntent={errors.role ? 'error' : 'none'}
          value={info.role}
          onChange={(e) => patchInfo('role', e.target.value)}
        />
        <TextField
          name="salaryMin"
          label="Salary (min)"
          sz="md"
          labelWidth={FORM_LABEL_WIDTH}
          inputWidth={FORM_INPUT_WIDTH}
          labelEllipsis
          helpText={errors.salaryMin ?? 'Approximate start of pay range ($ USD)'}
          helpIntent={errors.salaryMin ? 'error' : 'none'}
          value={info.salaryMin}
          onChange={(e) => patchInfo('salaryMin', e.target.value)}
        />
        <TextField
          name="salaryMax"
          label="Salary (max)"
          sz="md"
          labelWidth={FORM_LABEL_WIDTH}
          inputWidth={FORM_INPUT_WIDTH}
          labelEllipsis
          helpText={errors.salaryMax ?? 'Approximate end of pay range ($ USD)'}
          helpIntent={errors.salaryMax ? 'error' : 'none'}
          value={info.salaryMax}
          onChange={(e) => patchInfo('salaryMax', e.target.value)}
        />
        <TextField
          textArea
          name="other"
          label="Other?"
          css={{ resize: 'vertical' }}
          sz="md"
          labelWidth={FORM_LABEL_WIDTH}
          inputWidth={FORM_INPUT_WIDTH}
          helpText={
            errors.other ??
            "Other compensation like equity or bonuses, or anything else you'd like to add."
          }
          helpIntent={errors.other ? 'error' : 'none'}
          onChange={(e) => patchInfo('other', e.target.value)}
        />
        <Tooltip content="U.S. East" position="right">
          <CheckboxField
            name="remote"
            label="Remote?"
            css={{ alignSelf: 'center' }}
            sz="md"
            labelWidth={FORM_LABEL_WIDTH}
            readOnly
            checked={info.remote}
            helpText={errors.remote ?? "I'm only looking for remote positions."}
            helpIntent={errors.remote ? 'error' : 'none'}
          />
        </Tooltip>
        <P sz="sm" css={({ colors }) => ({ color: colors.gray.copy, fontStyle: 'italic' })}>
          This information is for my own personal use and will not be shared or sold.
        </P>
        <P sz="sm">
          Please email me at <strong>simongold.in at gmail</strong> with any questions.
        </P>
        <Button sz="lg" type="submit" css={{ alignSelf: 'end' }}>
          View document
        </Button>
      </FormContainer>
    </>
  );
};

export default PdfGuard;
