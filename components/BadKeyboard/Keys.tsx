import React from 'react';
import { transparentize } from 'polished';
import styled from '@emotion/styled';

import { Theme } from '../../styles/defaultTheme';

interface StyledKeyProps {
  isActive?: boolean;
  highlight?: boolean;
  unitWidth?: number;
  theme: Theme;
}

const StyledKey = styled.div(({ isActive = false, unitWidth = 1, theme }: StyledKeyProps) => {
  // 44/16 = 2.75
  const height = 2.75;
  return {
    margin: 3,
    color: isActive ? theme.colors.accent : theme.colors.brand,
    height: `${height}rem`,
    minWidth: `${height * unitWidth}rem`,
    borderWidth: 1,
    borderColor: isActive ? theme.colors.accent : theme.colors.brand,
    borderStyle: 'solid',
    fontSize: `${height * 0.4}rem`,
    borderRadius: theme.dimensions.borderRadii.regular,
    fontFamily: theme.fonts.monospace,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${isActive ? transparentize(0.45, theme.colors.gray.calm) : 'transparent'}`,
    '&:hover': {
      cursor: 'pointer'
    },
    '&:active': {
      backgroundColor: transparentize(0.45, theme.colors.gray.calm)
    },
    '& div': {
      width: '100%',
      lineHeight: `${height}rem`,
      textAlign: 'center',
      padding: `0 ${Math.round(height / 4)}rem`
    },
    [`@media(max-width: ${theme.breakpoints.sm}px)`]: {
      height: `${height}rem`,
      minWidth: `${height * unitWidth}rem`,
      fontSize: `${height / 3}rem`,
      margin: 1
    }
  };
});

interface CharKeyProps extends React.DOMAttributes<HTMLSpanElement> {
  isActive?: boolean;
  highlight?: boolean;
  unitWidth?: number;
}

export const CharKey = ({ isActive, highlight, children, unitWidth = 1, ...other }: CharKeyProps) => {
  return (
    <StyledKey isActive={isActive} highlight={highlight} draggable unitWidth={unitWidth} {...other}>
      <div>{children}</div>
    </StyledKey>
  );
};

export const KeyRow = styled.div(() => ({
  display: 'flex',
  flex: '1 1',
  flexWrap: 'wrap',
  width: '100%',
  alignContent: 'flex-start',
  justifyContent: 'center'
}));

export const KeyRowsContainer = styled.div(() => ({
  flexDirection: 'column',
  display: 'flex',
  alignContent: 'flex-start',
  justifyContent: 'center'
}));
