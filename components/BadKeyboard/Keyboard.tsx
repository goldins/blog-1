import React, { DragEventHandler } from 'react';
import styled from '@emotion/styled';

import { Keys, CharKey, BigCharKey, BigKey } from './Keys';

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const NUMERIC = '0123456789';
const SPECIAL = '`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';

export const SHIFT = 'SHIFT';
export const BACKSPACE = 'BACKSPACE';

const StyledKeyboard = styled.div(() => ({
  display: 'flex',
  userSelect: 'none'
}));

export const Keyboard = () => {
  const [shiftDrag, setShiftDrag] = React.useState(false);
  const [shifted, setShifted] = React.useState<string | null>(null);

  const onShiftDragStart = () => {
    setShiftDrag(true);
  };

  const onShiftDragEnd = () => {
    setShiftDrag(false);
  };

  const onDragEnter: DragEventHandler<HTMLElement> = (e) => {
    if (shiftDrag) {
      e.currentTarget.style.borderStyle = 'dashed';
      setShifted(e.currentTarget.innerText);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  };

  const onDragLeave: DragEventHandler<HTMLElement> = (e) => {
    if (shiftDrag) {
      e.currentTarget.style.borderStyle = 'solid';
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  };

  const onDragEnd: DragEventHandler<HTMLElement> = () => {
    setShifted(null);
  };

  return (
    <StyledKeyboard>
      <Keys>
        {ALPHA.split('').map((v) => (
          <CharKey
            showDroppable={shiftDrag}
            key={v}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
          >
            {shifted === v ? v.toUpperCase() : v}
          </CharKey>
        ))}
      </Keys>
      <Keys>
        {NUMERIC.split('').map((v) => (
          <CharKey key={v}>{v}</CharKey>
        ))}
      </Keys>
      <Keys>
        {SPECIAL.split('').map((v) => (
          <CharKey key={v}>{v}</CharKey>
        ))}
      </Keys>
      <BigKey draggable onDragStart={onShiftDragStart} onDragEnd={onShiftDragEnd}>
        {SHIFT}
      </BigKey>
      <BigCharKey value="\x08">{BACKSPACE}</BigCharKey>
    </StyledKeyboard>
  );
};
