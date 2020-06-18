import React, { Dispatch, DragEvent, memo, MouseEvent } from 'react';

import { CharKey, KeyRow, KeyRowsContainer } from './Keys';
import useKeyboardReducer, {
  Action,
  CHAR,
  setAlt,
  setShift,
  UseKeyboard,
  StateProps,
  updateCharAlt,
  updateCharShift
} from './useKeyboard';

// prettier-ignore
const ROW_1 = {
  normal:   '`1234567890-=',
  shift:    '~!@#$%^&*()_+',
  alt:      '`¡™£¢∞§¶•ªº–≠',
  shiftAlt: '~⁄€‹›ﬁﬂ‡°·‚—±'
};

// prettier-ignore
const ROW_2 = {
  normal:   'qwertyuiop[]\\',
  shift:    'QWERTYUIOP{}|',
  alt:      'œ∑´®†¥¨ˆøπ“‘«',
  shiftAlt: 'Œ„´‰ˇÁ¨ˆØ∏”’»'
};

// prettier-ignore
const ROW_3 = {
  normal:   'asdfghjkl;\'',
  shift:    'ASDFGHJKL:"',
  alt:      'åß∂ƒ©˙∆˚¬…æ',
  shiftAlt: 'ÅÍÎÏ˝ÓÔÒÚÆ'
};

// prettier-ignore
const ROW_4 = {
  normal:   'zxcvbnm,./',
  shift:    'ZXCVBNM<>?',
  alt:      'Ω≈ç√∫˜µ≤≥÷',
  shiftAlt: '¸˛Ç◊ı˜Â¯˘¿'
};

// prettier-ignore
const ROW_5 = {
  normal:   '       ',
  shift:    '       ',
  alt:      '       ',
  shiftAlt: '       '
};

export const ALT = 'ALT';
export const SHIFT = 'SHIFT';
export const BACKSPACE = 'BACKSPACE';

interface Modifiers {
  normal: string;
  shift: string;
  alt: string;
  shiftAlt: string;
}

type KeyWithMeta = {
  displayValue: string;
  modified: {
    normal: CHAR;
    shift: string;
    alt: string;
    shiftAlt: string;
  };
  acceptsShift: boolean;
  acceptsAlt: boolean;
};

interface RowKeysProps extends StateProps {
  row: KeyWithMeta[];
  pre?: string[];
  post?: string[];
}

const toggleCharState = (e: DragEvent<HTMLElement>, v: KeyWithMeta, state: UseKeyboard, dispatch: Dispatch<Action>) => {
  const {
    displayValue,
    acceptsShift,
    acceptsAlt,
    modified: { normal, alt, shift, shiftAlt }
  } = v;
  if (state.modifiers.shift && acceptsShift) {
    const isShift = [shift, shiftAlt].includes(displayValue);
    dispatch(updateCharShift(normal, !isShift));
  }
  if (state.modifiers.alt && acceptsAlt) {
    const isAlt = [alt, shiftAlt].includes(displayValue);
    dispatch(updateCharAlt(normal, !isAlt));
  }
};

const resetKey = (e: DragEvent<HTMLElement> | MouseEvent<HTMLElement>, v: KeyWithMeta, dispatch: Dispatch<Action>) => {
  dispatch(updateCharAlt(v.modified.normal, false));
  dispatch(updateCharShift(v.modified.normal, false));
};

const onDragEnd = (e: DragEvent<HTMLElement>, v: KeyWithMeta, dispatch: Dispatch<Action>) => {
  resetKey(e, v, dispatch);
  dispatch(setAlt(false));
  dispatch(setShift(false));
};

const onDragStart = (e: DragEvent<HTMLElement>, dispatch: Dispatch<Action>) => {
  const {
    currentTarget: { innerText },
    dataTransfer
  } = e;
  if (![ALT, SHIFT].includes(innerText)) {
    dataTransfer.setData('text', innerText);
  }

  if (innerText === ALT) {
    dispatch(setAlt(true));
  }

  if (innerText === SHIFT) {
    dispatch(setShift(true));
  }
};

const getDisplayValue = ({ modified }: KeyWithMeta, state: UseKeyboard): string => {
  const { alt = false, shift = false } = modified.normal in state.keys ? state.keys[modified.normal] : {};
  switch (true) {
    case alt && shift:
      return modified.shiftAlt;
    case shift:
      return modified.shift;
    case alt:
      return modified.alt;
    default:
      return modified.normal;
  }
};

const RowKeys = memo(({ row, state, dispatch }: RowKeysProps) => {
  return (
    <KeyRow>
      {row
        .reduce((acc: (KeyWithMeta & { width: number; displayValue: string })[], key) => {
          if (acc.length >= 1 && acc[acc.length - 1].modified.normal === key.modified.normal) {
            const newVal = acc.pop();
            if (!newVal) {
              throw new Error('No item found');
            }
            newVal.width++;
            return [...acc, newVal];
          }

          const displayValue = getDisplayValue(key, state);

          const newItem = {
            ...key,
            displayValue,
            width: 1
          };

          return [...acc, newItem];
        }, [])
        .map((v, i) => {
          const hasHighlight = (v.acceptsAlt && state.modifiers.alt) || (v.acceptsShift && state.modifiers.shift);
          return (
            <CharKey
              key={i}
              highlight={hasHighlight}
              unitWidth={v.width}
              onClick={(e) => resetKey(e, v, dispatch)}
              onDragEnter={(e) => toggleCharState(e, v, state, dispatch)}
              onDragLeave={(e) => toggleCharState(e, v, state, dispatch)}
              onDragStart={(e) => onDragStart(e, dispatch)}
              onDragEnd={(e) => onDragEnd(e, v, dispatch)}
              onDragOver={(e) => e.preventDefault()}
            >
              {v.displayValue}
            </CharKey>
          );
        })}
    </KeyRow>
  );
});

const makeMeta = (normal: CHAR, alt?: string, shift?: string, shiftAlt?: string) => {
  return {
    displayValue: normal,
    modified: {
      normal: normal,
      shift: shift ?? normal,
      alt: alt ?? normal,
      shiftAlt: shiftAlt ?? normal
    },
    acceptsShift: ![SHIFT, ALT, BACKSPACE, ' '].includes(normal),
    acceptsAlt: ![SHIFT, ALT, BACKSPACE, ' ', '`'].includes(normal)
  };
};

const expandRow = (pre: CHAR[] = [], row: Modifiers, post: CHAR[] = []): RowKeysProps['row'] => {
  const normal = row.normal.split('') as CHAR[];
  const shift = row.shift.split('');
  const alt = row.alt.split('');
  const shiftAlt = row.shiftAlt.split('');

  const keys: RowKeysProps['row'] = normal.map((n, i) => {
    return makeMeta(n, alt[i], shift[i], shiftAlt[i]);
  });

  keys.unshift(...pre.map((v) => makeMeta(v)));
  keys.push(...post.map((v) => makeMeta(v)));

  return keys;
};

const row1 = expandRow([], ROW_1, new Array(3).fill(BACKSPACE));
const row2 = expandRow([], ROW_2, []);
const row3 = expandRow([], ROW_3, []);
const row4 = expandRow(new Array(2).fill(SHIFT), ROW_4, new Array(2).fill(SHIFT));
const row5 = expandRow([ALT], ROW_5, [ALT]);

export const Keyboard = () => {
  const [state, dispatch] = useKeyboardReducer();

  return (
    <KeyRowsContainer>
      <RowKeys state={state} dispatch={dispatch} row={row1} />
      <RowKeys state={state} dispatch={dispatch} row={row2} />
      <RowKeys state={state} dispatch={dispatch} row={row3} />
      <RowKeys state={state} dispatch={dispatch} row={row4} />
      <RowKeys state={state} dispatch={dispatch} row={row5} />
    </KeyRowsContainer>
  );
};
