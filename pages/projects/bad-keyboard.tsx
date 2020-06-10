import React from 'react';
import { Keyboard } from '../../components/BadKeyboard/Keyboard';
import { Form } from '../../components/BadKeyboard/Form';

export default () => {
  const onSubmit = (message: string) => {
    alert(message);
  };
  return (
    <>
      <h2>Drag and Drop Keyboard</h2>
      <Form onSubmit={onSubmit} />
      <Keyboard />
    </>
  );
};
