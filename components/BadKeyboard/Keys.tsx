import React from 'react';
import { darken, lighten } from 'polished';
import styled from '@emotion/styled';

import { Theme } from '../../styles/defaultTheme';

interface StyledKeyProps {
  highlight?: boolean;
  unitWidth?: number;
  theme: Theme;
}

const KEY_COLOR = '#2230C1';

// 44/16 = 2.75
const KEY_HEIGHT = 2.75;
const ANIM_DURATION = `200ms`;

const StyledKey = styled.div(({ highlight = false, unitWidth = 1, theme }: StyledKeyProps) => {
  const color = highlight ? darken(0.2, KEY_COLOR) : KEY_COLOR;
  const borderColor = highlight ? darken(0.2, KEY_COLOR) : KEY_COLOR;
  const background = `radial-gradient(circle, ${
    highlight ? lighten(0.7, KEY_COLOR) : lighten(0.5, KEY_COLOR)
  } 0%, ${lighten(0.4, KEY_COLOR)} 100%)`;
  return {
    margin: 3,
    color,
    background,
    height: `${KEY_HEIGHT}rem`,
    border: `1px solid transparent`,
    borderColor,
    fontSize: `${KEY_HEIGHT * 0.4}rem`,
    borderRadius: theme.dimensions.borderRadii.regular,
    fontFamily: theme.fonts.monospace,
    display: 'flex',
    minWidth: `${KEY_HEIGHT * unitWidth}rem`,
    alignItems: 'center',
    transition: `color ${ANIM_DURATION}, border-color ${ANIM_DURATION}, background ${ANIM_DURATION}`,
    '&:hover': {
      cursor: 'pointer'
    },
    '& div': {
      width: '100%',
      lineHeight: `${KEY_HEIGHT}rem`,
      textAlign: 'center',
      padding: `0 ${Math.round(KEY_HEIGHT / 4)}rem`
    },
    [`@media(max-width: ${theme.breakpoints.sm}px)`]: {
      height: `5vh`,
      minWidth: `${7 * unitWidth}vw`,
      fontSize: `${KEY_HEIGHT * 0.33}rem`,
      margin: 1,
      '& div': {
        padding: `0 ${Math.round((KEY_HEIGHT / 4) * 0.6)}rem`
      }
    }
  };
});

interface CharKeyProps extends React.DOMAttributes<HTMLSpanElement> {
  highlight?: boolean;
  unitWidth?: number;
}

export const CharKey = ({ highlight, children, unitWidth = 1, ...other }: CharKeyProps) => {
  return (
    <StyledKey highlight={highlight} draggable unitWidth={unitWidth} {...other}>
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

export const KeyRowsContainer = styled.div(({ theme }: { theme: Theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  alignContent: 'flex-start',
  justifyContent: 'center',
  [`@media(max-width: ${theme.breakpoints.sm}px)`]: {
    position: 'fixed',
    left: 0,
    bottom: 0
  }
}));
