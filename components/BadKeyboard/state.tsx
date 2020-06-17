import { Dispatch, Reducer, ReducerAction, useReducer } from 'react';

export type MODIFIERS = 'shift' | 'alt';

// prettier-ignore
export type CHAR =
  '`' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '-' | '=' |
  'q' | 'w' | 'e' | 'r' | 't' | 'y' | 'u' | 'i' | 'o' | 'p' | '[' | ']' | '\\' |
  'a' | 's' | 'd' | 'f' | 'g' | 'h' | 'j' | 'k' | 'l' | ';' | "'" |
  'z' | 'x' | 'c' | 'v' | 'b' | 'n' | 'm' | ',' | '.' | '/' |
  'ALT' | 'SHIFT' | 'BACKSPACE'

// prettier-ignore
const CHARS: CHAR[] = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'",
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ALT', 'SHIFT', 'BACKSPACE'
];

type CharsRecord = Record<CHAR, Record<MODIFIERS, boolean>>;

const defaultModifiers = {
  shift: false,
  alt: false
};

const KEYS: CharsRecord = CHARS.reduce<CharsRecord>(
  (acc, char) => ({ ...acc, [char]: { ...defaultModifiers } }),
  {} as CharsRecord
);

export interface State {
  // 'a': { shift: false, alt: false }
  modifiers: Record<MODIFIERS, boolean>;
  keys: Record<CHAR, Record<MODIFIERS, boolean>>;
}

export type Action =
  | { type: 'setShift'; value: boolean }
  | { type: 'setAlt'; value: boolean }
  | { type: 'updateCharShift'; char: CHAR; value: boolean }
  | { type: 'updateCharAlt'; char: CHAR; value: boolean };

export interface StateProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setShift':
      return {
        ...state,
        modifiers: {
          ...state.modifiers,
          shift: action.value
        }
      };
    case 'setAlt':
      return {
        ...state,
        modifiers: {
          ...state.modifiers,
          alt: action.value
        }
      };
    case 'updateCharShift':
      return {
        ...state,
        keys: {
          ...state.keys,
          [action.char]: {
            ...state.keys[action.char],
            shift: action.value
          }
        }
      };
    case 'updateCharAlt':
      return {
        ...state,
        keys: {
          ...state.keys,
          [action.char]: {
            ...state.keys[action.char],
            alt: action.value
          }
        }
      };
  }

  return { ...state };
};

export const initialState = (): State => ({
  modifiers: {
    alt: false,
    shift: false
  },
  keys: KEYS
});

export const setAlt: (v: boolean) => ReducerAction<typeof reducer> = (value: boolean) => ({
  type: 'setAlt',
  value
});

export const setShift: (v: boolean) => ReducerAction<typeof reducer> = (value: boolean) => ({
  type: 'setShift',
  value
});

export const updateCharAlt: (char: CHAR, v: boolean) => ReducerAction<typeof reducer> = (
  char: CHAR,
  value: boolean
) => ({
  type: 'updateCharAlt',
  char,
  value
});

export const updateCharShift: (char: CHAR, v: boolean) => ReducerAction<typeof reducer> = (
  char: CHAR,
  value: boolean
) => ({
  type: 'updateCharShift',
  char,
  value
});

const useKeyboardReducer = () => {
  return useReducer(reducer, initialState());
};

export default useKeyboardReducer;
