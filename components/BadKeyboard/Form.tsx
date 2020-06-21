import React from 'react';
import { noop } from 'lodash';
import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';
import { BACKSPACE, BACKSPACE_SMALL } from './Keyboard';
import { useTheme } from 'emotion-theming';

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
  },
  [`@media(max-width: ${theme.breakpoints.sm}px)`]: {
    marginBottom: 0,
    height: '40%',
    position: 'fixed',
    left: 0,
    width: '100%',
    overflow: 'scroll'
  }
}));

const StyledInput = styled.input(({ theme }: { theme: Theme }) => ({
  color: 'transparent',
  textShadow: `0 0 0 ${theme.colors.gray.dark}`,
  fontSize: theme.dimensions.fontSize.regular,
  lineHeight: theme.dimensions.lineHeight.regular * 1.5,
  letterSpacing: 1,
  borderColor: theme.colors.gray.calm,
  borderRadius: 8,
  borderStyle: 'solid',
  borderWidth: 2,
  cursor: 'not-allowed',
  '&:focus': {
    outline: 'none'
  }
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
  text: string,
  valueKey: keyof FormValues,
  values: FormValues,
  setValues: React.Dispatch<React.SetStateAction<FormValues>>
) => void;

const updateForm: OnDrop = (text, valueKey, values, setValues) => {
  setValues((oldValues) => {
    // for now, just append to the end.
    // it seems impossible to know at what selection index the drop is occurring before it happens.2
    // selectionStart and selectionEnd are not updated as the drag is happening.
    const newVal = [BACKSPACE, BACKSPACE_SMALL].includes(text)
      ? oldValues[valueKey].slice(0, -1)
      : oldValues[valueKey] + text;

    return { ...oldValues, [valueKey]: newVal };
  });
};

export const Form = () => {
  const theme = useTheme<Theme>();

  const onSubmit = (values: FormValues) => {
    const message = Object.keys(values).reduce(
      (acc, currentKey) => [...acc, `\n${currentKey}: ${values[currentKey as keyof FormValues].toString()}`],
      [] as string[]
    );
    alert(message.join(''));
  };

  const [values, setValues] = React.useState<FormValues>({ value1: '', value2: '' });

  const setHighlight = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = theme.colors.accent;

    e.preventDefault();
    e.stopPropagation();
  };

  const clearHighlight = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = '';

    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLInputElement>, valueKey: keyof FormValues) => {
    const { dataTransfer } = e;
    const text = dataTransfer.getData('text');

    updateForm(text, valueKey, values, setValues);

    clearHighlight(e);

    e.preventDefault();
    e.stopPropagation();
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
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={setHighlight}
        onDragLeave={clearHighlight}
        onDrop={(e) => onDrop(e, 'value1')}
        value={values.value1}
        onChange={noop}
      />
      <StyledInput
        placeholder="Or drag here"
        type="text"
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={setHighlight}
        onDragLeave={clearHighlight}
        onDrop={(e) => onDrop(e, 'value2')}
        value={values.value2}
        onChange={noop}
      />
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
};
