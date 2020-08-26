import * as React from 'react';
import { H2 } from '../../../components/General';

import template from './template.png';
import styled from '@emotion/styled';

const Canvas = styled.canvas(({ x, y }: { x?: number; y?: number }) => ({
  position: 'absolute',
  left: y ?? 'auto',
  top: x ?? 'auto'
}));

const AbsoluteContainer = styled.div(() => ({
  position: 'absolute',
  left: '50%',
  marginLeft: -350
}));

// prettier-ignore
const PLACEMENTS_POS = [
  // [x1, y1], [x2, y2]
  [[ 14, 106], [97,  264]],
  [[  6, 550], [98,  694]],
  [[112, 227], [148, 258]],
  [[140, 190], [194, 234]],
  [[130, 535], [299, 675]],
  [[115, 449], [183, 563]],
  [[203, 240], [274, 351]],
  [[216, 104], [339, 280]],
  [[275, 278], [494, 507]],
  [[340,   5], [425,  88]],
  [[344, 577], [460, 655]],
];

export default () => {
  const canvasEl = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const { current: canvas } = canvasEl;

    if (!canvas) {
      throw new Error('missing canvas');
    }

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('missing context');
    }

    const templateImg = new Image();
    templateImg.src = template;
    templateImg.onload = function () {
      PLACEMENTS_POS.forEach(([[x1, y1], [x2, y2]]) => {
        context.drawImage(templateImg, y1, x1, y2 - y1, x2 - x1);
      });

      context.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <>
      <H2>&quot;Do It for Her&quot; Generator</H2>
      <AbsoluteContainer>
        <Canvas height={500} width={700} ref={canvasEl} />
      </AbsoluteContainer>
    </>
  );
};
