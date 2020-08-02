import React from 'react';
import { noop } from 'lodash';
import styled from '@emotion/styled';
import { Theme } from '../../styles/defaultTheme';
import { BACKSPACE, BACKSPACE_SMALL } from './Keyboard';
import { useTheme } from 'emotion-theming';
import { Button, FormContainer, TextField } from '../General';

const StyledInput = styled(TextField)(({ theme }: { theme: Theme }) => ({
  color: 'transparent',
  textShadow: `0 0 0 ${theme.colors.gray.dark}`,
  cursor: 'not-allowed'
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
      (acc, currentKey) => [
        ...acc,
        `\n${currentKey}: ${values[currentKey as keyof FormValues].toString()}`
      ],
      [] as string[]
    );
    alert(message.join(''));
  };

  const [values, setValues] = React.useState<FormValues>({ value1: '', value2: '' });

  const setHighlight = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = theme.colors.brand;

    e.preventDefault();
    e.stopPropagation();
  };

  const clearHighlight = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = '';

    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    setHighlight(e);
    e.preventDefault();
  };

  const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
    clearHighlight(e);
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
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(values);
      }}
      noValidate
    >
      <StyledInput
        sz="lg"
        placeholder="Drag here"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, 'value1')}
        value={values.value1}
        onChange={noop}
      />
      <StyledInput
        sz="lg"
        placeholder="Or drag here"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, 'value2')}
        value={values.value2}
        onChange={noop}
      />
      <Button sz="lg" type="submit">
        Submit
      </Button>
    </FormContainer>
  );
};
