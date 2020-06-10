import React, { DragEventHandler } from 'react';
import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';

const StyledForm = styled.form(() => ({
  marginTop: `1rem`,
  marginBottom: `1rem`
}));

const StyledInput = styled.input(({ theme }: { theme: Theme }) => ({
  outline: 'none',
  fontSize: theme.dimensions.fontSize.regular,
  lineHeight: theme.dimensions.lineHeight.regular * 1.5,
  letterSpacing: 2,
  borderWidth: 1,
  borderColor: theme.colors.gray.calm,
  cursor: 'not-allowed'
}));

const StyledButton = styled.button(({ theme }: { theme: Theme }) => ({
  fontSize: theme.dimensions.fontSize.regular,
  lineHeight: theme.dimensions.lineHeight.regular * 1.5,
  marginLeft: `1rem`,
  letterSpacing: 2,
  cursor: 'pointer'
}));

type FormValues = {
  value1: string;
};

type InputDragEventHandler = DragEventHandler<HTMLInputElement>;

const onDragEnter: InputDragEventHandler = (e) => {
  e.currentTarget.style.borderStyle = 'dashed';
  e.currentTarget.removeAttribute('readonly');
};

const onDragLeave: InputDragEventHandler = (e) => {
  e.currentTarget.style.borderStyle = 'solid';
  e.currentTarget.setAttribute('readonly', '');
};

interface FormProps {
  onSubmit: (v: string) => void;
}

export const Form = ({ onSubmit }: FormProps) => {
  const [values, setValues] = React.useState<FormValues>({ value1: '' });

  const resetValues = () => {
    setValues({ value1: '' });
  };

  // todo: abstraction
  const onDrop: InputDragEventHandler = (e) => {
    if (e.currentTarget) {
      const { currentTarget, dataTransfer } = e;
      currentTarget.setAttribute('readonly', '');
      currentTarget.style.borderStyle = 'solid';

      const text = dataTransfer.getData('text');

      setValues(({ value1 }) => {
        // for now, just append to the end.
        // it seems impossible to know at what selection index the drop is occurring before it happens.
        // selectionStart and selectionEnd are not updated as the drag is happening.
        const newVal = value1 + text;

        // eslint-disable-next-line no-control-regex
        const afterBackspace = newVal.replace(/.?\\x08/, '');
        return { ...values, value1: afterBackspace };
      });
      setTimeout(() => {
        currentTarget.blur();
      }, 0);
    }
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(values.value1);
      }}
      noValidate
    >
      <StyledInput
        type="text"
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        value={values.value1}
        readOnly
      />
      <StyledButton type="submit">Submit</StyledButton>
      {/* todo: replace with backspace? */}
      <StyledButton type="button" onClick={resetValues}>
        Clear
      </StyledButton>
    </StyledForm>
  );
};
