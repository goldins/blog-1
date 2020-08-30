import * as React from 'react';
import { H2, H3 } from '../../../components/General';

import template from './template.png';
import styled, { WithTheme } from '@emotion/styled';
import { Theme } from '../../../styles/defaultTheme';

const CONTAINER_WIDTH = 700;

const Canvas = styled.canvas(({ x, y }: WithTheme<{ x?: number; y?: number }, Theme>) => ({
  position: 'absolute',
  left: y ?? 'auto',
  top: x ?? 'auto',
  zIndex: 1
}));

const AbsoluteContainer = styled.div(({ width }: WithTheme<{ width: number }, Theme>) => ({
  position: 'absolute',
  left: '50%',
  marginLeft: -width / 2
}));

// prettier-ignore
const PLACEMENTS_POS: [number, number][][] = [
  [[208,  24],  [528,  196]], // 0
  [[1096, 6],   [1384, 194]], // 1
  [[452,  224], [514,  290]], // 2
  [[376,  278], [462,  384]], // 3
  [[1064, 258], [1348, 594]], // 4
  [[892,  226], [1122, 364]], // 5
  [[478,  404], [696,  540]], // 6
  [[206,  430], [552,  674]], // 7
  [[552,  544], [1012, 984]], // 8
  [[8,    676], [170,  844]], // 9
  [[1148, 682], [1306, 914]]  // 10
];

const getContext = (el: HTMLCanvasElement | null): CanvasRenderingContext2D => {
  if (!el) {
    throw new Error('missing element');
  }

  const context = el.getContext('2d');
  if (!context) {
    throw new Error('no context');
  }

  return context;
};

type UploadElementProps = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const UploadElement = styled.div(
  ({ theme, x1, y1, x2, y2 }: WithTheme<UploadElementProps, Theme>) => ({
    position: 'absolute',
    top: y1,
    left: x1,
    height: y2 - y1,
    width: x2 - x1,
    backgroundColor: theme.colors.white,
    cursor: 'pointer',
    border: `2px solid ${theme.colors.black}`,
    '&:hover': {
      backgroundColor: theme.colors.brand,
      opacity: 0.6
    },
    zIndex: 2
  })
);

export default () => {
  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  const [scaleFactor, setScaleFactor] = React.useState(1);
  const [debugError, setDebugError] = React.useState('');

  React.useEffect(() => {
    try {
      const canvas = canvasEl.current;

      if (!canvas) {
        return;
      }

      const context = getContext(canvas);

      const templateImg = new Image();
      templateImg.src = template;
      templateImg.onload = function () {
        const { width: tplWidth, height: tplHeight } = templateImg;
        const { width: canvasWidth } = canvas;

        setScaleFactor(() => {
          const newScale = canvasWidth / tplWidth;
          const newCanvasHeight = tplHeight * newScale;
          canvas.height = newCanvasHeight;
          context.drawImage(templateImg, 0, 0, canvasWidth, newCanvasHeight);
          return newScale;
        });
      };
    } catch (e) {
      setDebugError(e.message);
    }
  }, []);

  return (
    <>
      <H2>&quot;Do It for Her&quot; Generator</H2>
      {debugError ? <H3>{debugError}</H3> : null}
      <AbsoluteContainer width={CONTAINER_WIDTH}>
        {PLACEMENTS_POS.map(([[x1, y1], [x2, y2]], idx) => {
          const [x1s, y1s, x2s, y2s] = [x1, y1, x2, y2].map((v) => v * scaleFactor);
          return <UploadElement key={idx} x1={x1s} y1={y1s} x2={x2s} y2={y2s} />;
        })}
        <Canvas width={CONTAINER_WIDTH} ref={canvasEl} />
      </AbsoluteContainer>
    </>
  );
};
