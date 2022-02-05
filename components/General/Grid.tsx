import { InputHTMLAttributes } from 'react';
import type { Property } from 'csstype';
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { SizeProps } from '../../styles/defaultTheme';

interface Props extends InputHTMLAttributes<HTMLDivElement>, SizeProps {
  alignItems?: Property.AlignItems;
  gap?: Property.Gap;
  gridArea?: Property.GridArea;
  gridTemplateAreas?: Property.GridTemplateAreas;
  gridTemplateColumns?: Property.GridTemplateColumns;
  gridTemplateRows?: Property.GridTemplateRows;
  justifyContent?: Property.JustifyContent;
}

export const Grid = styled('div')(
  ({
    alignItems = 'initial',
    gap = 'initial',
    gridArea = 'initial',
    gridTemplateAreas = 'initial',
    gridTemplateColumns = 'initial',
    gridTemplateRows = 'initial',
    justifyContent = 'initial',
  }: { theme?: Theme } & Props) => ({
    alignItems,
    display: 'grid',
    gap,
    gridArea,
    gridTemplateAreas,
    gridTemplateColumns,
    gridTemplateRows,
    justifyContent,
  })
);
