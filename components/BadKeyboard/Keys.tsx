import React, { DragEventHandler } from 'react';
import { transparentize } from 'polished';
import styled from '@emotion/styled';

import { Theme } from '../../styles/defaultTheme';

const StyledKey = styled.div(({ highlight, theme }: { highlight?: boolean; theme: Theme }) => ({
  margin: 3,
  color: theme.colors.brand,
  width: `2rem`,
  height: `2rem`,
  borderWidth: 1,
  borderColor: highlight ? theme.colors.brand : theme.colors.gray.calm,
  borderStyle: 'solid',
  fontSize: `1rem`,
  borderRadius: theme.dimensions.borderRadii.regular,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer'
  },
  '&:active': {
    backgroundColor: transparentize(0.45, theme.colors.gray.calm)
  },
  [`@media(min-width: ${theme.breakpoints.sm}px)`]: {
    width: `2.5rem`,
    height: `2.5rem`,
    fontSize: `1.15rem`
  }
}));

const charKeyDragEnd: DragEventHandler<HTMLElement> = (e) => {
  e.currentTarget.style.borderStyle = 'solid';
};

const charKeyDragStart: (v: string) => DragEventHandler<HTMLElement> = (v) => (e) => {
  e.currentTarget.style.borderStyle = 'dashed';
  e.dataTransfer.setData('text/plain', v);
};

export const CharKey = ({
  showDroppable,
  children,
  value,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragEnd
}: {
  showDroppable?: boolean;
  children: string;
  value?: string;
  onDragEnter?: DragEventHandler<HTMLElement>;
  onDragLeave?: DragEventHandler<HTMLElement>;
  onDrop?: DragEventHandler<HTMLElement>;
  onDragEnd?: DragEventHandler<HTMLElement>;
}) => {
  return (
    <StyledKey
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      highlight={showDroppable}
      draggable
      onDragStart={charKeyDragStart(value ?? children)}
      onDragEnd={(e) => {
        charKeyDragEnd(e);
        if (onDragEnd) {
          onDragEnd(e);
        }
      }}
    >
      {children}
    </StyledKey>
  );
};

const StyledBigKey = styled(StyledKey)(() => ({
  width: 'auto',
  paddingRight: `1rem`,
  paddingLeft: `1rem`,
  '@media(min-width: 600px)': {
    paddingRight: `2rem`,
    paddingLeft: `2rem`,
    width: `auto`
  }
}));

export const BigKey = StyledBigKey;

export const BigCharKey = ({ children, value }: { children: string; value: string }) => {
  return (
    <StyledBigKey draggable onDragStart={charKeyDragStart(value ?? children)} onDragEnd={charKeyDragEnd}>
      {children}
    </StyledBigKey>
  );
};

export const Keys = styled.div(() => ({
  display: 'flex',
  flex: '1 1',
  flexWrap: 'wrap',
  width: '100%',
  textAlign: 'center',
  alignContent: 'flex-start',
  justifyContent: 'center'
}));
