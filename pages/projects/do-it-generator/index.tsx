import * as React from 'react';
import styled, { CSSObject } from '@emotion/styled';
import { Theme, useTheme, WithTheme } from '@emotion/react';

import { Button, H2, H3 } from '../../../components/General';

import template from './template.png';

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

type PositionProps = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const positionAbsolutely = ({ x1, y1, x2, y2 }: PositionProps): CSSObject => ({
  position: 'absolute',
  top: y1,
  left: x1,
  height: y2 - y1,
  width: x2 - x1
});

const commonImageStyles = (theme: Theme): CSSObject => ({
  overflow: 'hidden',
  backgroundColor: theme.colors.white,
  cursor: 'pointer',
  border: `2px solid ${theme.colors.black}`,
  '&:hover': {
    backgroundColor: theme.colors.brand,
    opacity: 0.6,
    '+ input': {
      visibility: 'hidden'
    }
  }
});

const StyledPositionedInput = styled.input(
  ({ x1, y1, x2, y2 }: WithTheme<PositionProps, Theme>) => ({
    ...positionAbsolutely({ x1, y1, x2, y2 }),
    border: '2px solid transparent'
  })
);

const StyledPositionedUpload = styled.span(
  ({ theme, x1, y1, x2, y2 }: WithTheme<PositionProps, Theme>) => ({
    ...positionAbsolutely({ x1, y1, x2, y2 }),
    ...commonImageStyles(theme),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Math.min(y2 - y1, x2 - x1),

    zIndex: 2
  })
);

const StyledPositionedImg = styled.div(
  ({ src, theme, x1, y1, x2, y2 }: WithTheme<PositionProps & { src: string }, Theme>) => ({
    ...positionAbsolutely({ x1, y1, x2, y2 }),
    ...commonImageStyles(theme),
    backgroundImage: `url("${src}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: theme.colors.white,
    zIndex: 2
  })
);

type UploadElementProps = PositionProps & {
  uniqueId: number;
  src: string | null;
  onSelect: (fl: FileList | null) => void;
};

const scaleValues = (scaleFactor: number, numbers: number[]) => numbers.map((n) => n * scaleFactor);

const UploadElement = ({ src, uniqueId, onSelect, ...rest }: UploadElementProps) => {
  const theme = useTheme();

  const uploadEl = React.useRef<HTMLInputElement>(null);

  const onDragOver = React.useCallback((e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  }, []);

  const onDragEnter = React.useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.style.backgroundColor = theme.colors.accent;
      e.currentTarget.style.opacity = '0.6';
    },
    [theme.colors.accent]
  );

  const onDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.style.backgroundColor = theme.colors.white;
      e.currentTarget.style.opacity = '1';
    },
    [theme.colors.white]
  );

  const onDrop = React.useCallback(
    (e: React.DragEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.style.backgroundColor = theme.colors.white;
      e.currentTarget.style.opacity = '1';

      const dt = e.dataTransfer;
      const files = dt.files;

      onSelect(files);
    },
    [onSelect, theme.colors.white]
  );

  return (
    <>
      <StyledPositionedUpload
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          uploadEl.current?.click();
        }}
        {...rest}
      >
        🖼️
      </StyledPositionedUpload>
      {src ? (
        <StyledPositionedImg
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            uploadEl.current?.click();
          }}
          src={src}
          {...rest}
        />
      ) : null}
      <StyledPositionedInput
        ref={uploadEl}
        {...rest}
        id={`upload_${uniqueId}`}
        name={`upload_${uniqueId}`}
        onChange={(e) => onSelect(e.currentTarget.files)}
        accept="image/png, image/jpeg, image/gif"
        type="file"
        required
      />
    </>
  );
};

export default () => {
  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  const downloadEl = React.useRef<HTMLAnchorElement>(null);
  const [scaleFactor, setScaleFactor] = React.useState(1);
  const [canvasSize, setCanvasSize] = React.useState({ w: 0, h: 0 });
  const [debugError, setDebugError] = React.useState('');
  const [imgs, setImgs] = React.useState<(null | string)[]>(
    new Array(PLACEMENTS_POS.length).fill(null)
  );

  React.useEffect(() => {
    try {
      const canvas = canvasEl.current;

      if (!canvas) {
        return;
      }

      const context = getContext(canvas);

      const templateImg = new Image();
      templateImg.src = template.src;
      templateImg.onload = () => {
        const { width: tplWidth, height: tplHeight } = templateImg;
        const { width: canvasWidth } = canvas;

        setScaleFactor(() => {
          const newScale = canvasWidth / tplWidth;
          const newCanvasHeight = tplHeight * newScale;
          setCanvasSize({ w: canvasWidth, h: newCanvasHeight });
          canvas.height = newCanvasHeight;
          context.drawImage(templateImg, 0, 0, canvasWidth, newCanvasHeight);
          return newScale;
        });
      };
    } catch (e) {
      setDebugError(e instanceof Error ? e.message : 'Unknown error');
    }
  }, []);

  const onSelect = (idx: number) => (files: FileList | null) => {
    if (!files) {
      return;
    }

    const [file] = Array.from(files);

    if (!file) {
      return;
    }

    const newImgs = [...imgs];

    const reader = new FileReader();

    reader.onload = (e) => {
      newImgs[idx] = (e?.target?.result as string) ?? null;
      setImgs(newImgs);
    };

    reader.readAsDataURL(file);
  };

  const drawToCanvas = (
    imgSrc: string | null,
    index: number,
    context: CanvasRenderingContext2D
  ) => {
    if (!imgSrc) {
      return Promise.reject();
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.src = imgSrc;
      img.onload = () => {
        const { width: natWidth, height: natHeight } = img;
        const [[x1, y1], [x2, y2]] = PLACEMENTS_POS[index];
        const [x1s, y1s, x2s, y2s] = scaleValues(scaleFactor, [x1, y1, x2, y2]);
        const renderWidth = x2s - x1s;
        const renderHeight = y2s - y1s;

        // both sides!
        const BORDER_WIDTH = 2;

        const renderRatio = renderWidth / renderHeight;
        const imgRatio = natWidth / natHeight;

        const fitAxis = renderRatio > imgRatio ? 'width' : 'height';

        const fitSize = {
          sWidth: fitAxis === 'width' ? natWidth : natWidth * renderRatio,
          sHeight: fitAxis === 'height' ? natHeight : natHeight / renderRatio
        };

        const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = {
          ...fitSize,
          sx: fitAxis === 'width' ? 0 : (natWidth - fitSize.sWidth) / 2,
          sy: fitAxis === 'height' ? 0 : (natHeight - fitSize.sHeight) / 2,
          dx: x1s + BORDER_WIDTH,
          dy: y1s + BORDER_WIDTH,
          dWidth: renderWidth,
          dHeight: renderHeight
        };

        context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        resolve(void 0);
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasEl.current;

    const context = getContext(canvas);

    if (!context) {
      throw new Error('missing context?');
    }

    const imgPromises = imgs.map((imgSrc, idx) => drawToCanvas(imgSrc, idx, context));

    await Promise.all(imgPromises);
    const templateImg = new Image();
    templateImg.src = template.src;
    templateImg.onload = () => {
      const canvasWidth = canvas?.width ?? 0;
      const canvasHeight = canvas?.height ?? 0;

      // draw template over loaded images
      context.drawImage(templateImg, 0, 0, canvasWidth, canvasHeight);

      const downloadSrc = canvasEl.current?.toDataURL('image/png');

      if (!downloadSrc) {
        throw new Error('missing downloadSrc');
      }

      if (!downloadEl.current) {
        throw new Error('missing download element');
      }

      downloadEl.current.href = downloadSrc;
      downloadEl.current.download = 'do-it-for-her';
      downloadEl.current.click();

      // clear drawing and redraw template
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(templateImg, 0, 0, canvasWidth, canvasHeight);
    };

    return false;
  };

  return (
    <>
      <H2>&quot;Do It for Her&quot; Generator</H2>
      {debugError ? <H3>{debugError}</H3> : null}
      <form onSubmit={onSubmit}>
        <AbsoluteContainer width={CONTAINER_WIDTH}>
          {PLACEMENTS_POS.map(([[x1, y1], [x2, y2]], idx) => {
            const [x1s, y1s, x2s, y2s] = scaleValues(scaleFactor, [x1, y1, x2, y2]);
            return (
              <UploadElement
                src={imgs[idx]}
                key={idx}
                uniqueId={idx}
                x1={x1s}
                y1={y1s}
                x2={x2s}
                y2={y2s}
                onSelect={onSelect(idx)}
              />
            );
          })}
          <Canvas width={CONTAINER_WIDTH} ref={canvasEl} />
          <Button
            type="submit"
            style={{ top: canvasSize.h + 10, right: -canvasSize.w, position: 'absolute' }}
          >
            Save
          </Button>
          <a ref={downloadEl} download style={{ display: 'none' }} />
        </AbsoluteContainer>
      </form>
    </>
  );
};
