import React from 'react';
import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';
import { BACKSPACE } from './Keyboard';

const StyledForm = styled.form(({ theme }: { theme: Theme }) => ({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.colors.gray.calm,
  display: 'flex',
  flexDirection: 'column',
  padding: `1rem`,
  marginBottom: `1rem`,
  '& input': {
    marginBottom: '.5rem'
  }
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
  letterSpacing: 2,
  cursor: 'pointer'
}));

type FormValues = {
  value1: string;
  value2: string;
};

type OnDrop = (
  e: React.DragEvent<HTMLInputElement>,
  valueKey: keyof FormValues,
  values: FormValues,
  setValues: React.Dispatch<React.SetStateAction<FormValues>>,
  setReadOnly: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const updateForm: OnDrop = (e, valueKey, values, setValues, setReadOnly) => {
  const { dataTransfer } = e;

  const text = dataTransfer.getData('text');

  setValues((oldValues) => {
    // for now, just append to the end.
    // it seems impossible to know at what selection index the drop is occurring before it happens.
    // selectionStart and selectionEnd are not updated as the drag is happening.
    const newVal = text === BACKSPACE ? oldValues[valueKey].slice(0, -1) : oldValues[valueKey] + text;

    return { ...oldValues, [valueKey]: newVal };
  });
  setTimeout(() => {
    setReadOnly(true);
  }, 0);
};

export const Form = () => {
  const onSubmit = (values: FormValues) => {
    const message = Object.keys(values).reduce(
      (acc, currentKey) => [...acc, `\n${currentKey}: ${values[currentKey as keyof FormValues].toString()}`],
      [] as string[]
    );
    alert(message.join(''));
  };

  const [values, setValues] = React.useState<FormValues>({ value1: '', value2: '' });
  const [readOnly, setReadOnly] = React.useState(true);

  const onDragOver: React.DragEventHandler<HTMLInputElement> = () => {
    setReadOnly(false);
  };

  const onDrop = (e: React.DragEvent<HTMLInputElement>, valueKey: keyof FormValues) => {
    updateForm(e, valueKey, values, setValues, setReadOnly);
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(values);
      }}
      noValidate
    >
      <StyledInput
        placeholder="Drag here"
        type="text"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, 'value1')}
        value={values.value1}
        readOnly={readOnly}
      />
      <StyledInput
        placeholder="Drag here"
        type="text"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, 'value2')}
        value={values.value2}
        readOnly={readOnly}
      />
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
};
