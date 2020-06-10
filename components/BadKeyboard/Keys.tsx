import React, { DragEventHandler } from 'react';
import { transparentize } from 'polished';
import styled from '@emotion/styled';

import { Theme } from '../../styles/defaultTheme';

const KEY_SIZE_FACTOR = 2.75;

const StyledKey = styled.div(({ highlight, theme }: { highlight?: boolean; theme: Theme }) => ({
  margin: 3,
  color: theme.colors.brand,
  width: theme.dimensions.fontSize.regular * KEY_SIZE_FACTOR,
  height: theme.dimensions.fontSize.regular * KEY_SIZE_FACTOR,
  borderWidth: 1,
  borderColor: highlight ? theme.colors.brand : theme.colors.gray.calm,
  borderStyle: 'solid',
  fontSize: theme.dimensions.fontSize.regular,
  borderRadius: theme.dimensions.borderRadii.regular,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer'
  },
  '&:active': {
    backgroundColor: transparentize(0.45, theme.colors.gray.calm)
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

const StyledBigKey = styled(StyledKey)(({ theme }: { theme: Theme }) => ({
  width: theme.dimensions.fontSize.regular * 2.75 * 2.5
}));

export const BigKey = StyledBigKey;

export const BigCharKey = ({ children, value }: { children: string; value: string }) => {
  return (
    <StyledBigKey draggable onDragStart={charKeyDragStart(value ?? children)} onDragEnd={charKeyDragEnd}>
      {children}
    </StyledBigKey>
  );
};

export const Keys = styled.div(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flex: '1 1',
  flexWrap: 'wrap',
  width: '100%',
  textAlign: 'center',
  alignContent: 'flex-start',
  justifyContent: 'center',
  maxWidth: theme.dimensions.fontSize.regular * KEY_SIZE_FACTOR * 8
}));
