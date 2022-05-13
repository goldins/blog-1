import {
  Children,
  cloneElement,
  CSSProperties,
  Dispatch,
  isValidElement,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
  useRef,
  useState,
} from 'react';

type SupportedElement = HTMLElement;

const SIDE_OFFSET = 5;

const TOOLTIP_POSITIONS = (refEl: SupportedElement, contentEl: SupportedElement) => ({
  top: {
    top: refEl.offsetTop - contentEl.offsetHeight - SIDE_OFFSET,
    left: refEl.offsetLeft - contentEl.offsetWidth / 2,
  },
  right: {
    top: refEl.offsetTop + (refEl.offsetHeight - contentEl.offsetHeight) / 2,
    left: refEl.offsetLeft + refEl.offsetWidth + SIDE_OFFSET,
  },
  bottom: {
    top: refEl.offsetTop + contentEl.offsetHeight / 2,
    left: refEl.offsetLeft - contentEl.offsetWidth / 2,
  },
  left: {
    top: refEl.offsetTop + (refEl.offsetHeight - contentEl.offsetHeight) / 2,
    left: refEl.offsetLeft - contentEl.offsetWidth - SIDE_OFFSET,
  },
});

type SUPPORTED_POSITION = 'top' | 'right' | 'bottom' | 'left';

const handleOpen = (
  targetEl: SupportedElement,
  contentEl: SupportedElement,
  setStyles: Dispatch<SetStateAction<CSSProperties>>,
  position: SUPPORTED_POSITION
) => {
  contentEl.setAttribute('data-visible', 'true');
  window.requestAnimationFrame(() => {
    setStyles(TOOLTIP_POSITIONS(targetEl, contentEl)[position]);
  });
};

const handleClose = (contentEl?: SupportedElement | null) => {
  if (contentEl) {
    contentEl.removeAttribute('data-visible');
  }
};

type TooltipProps = PropsWithChildren<{
  content: string;
  targetElement?: SupportedElement;
  position?: SUPPORTED_POSITION;
}>;

// Fix me
export const Tooltip = ({ children, content, position = 'top' }: TooltipProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [contentPositions, setContentPositions] = useState<CSSProperties>({});

  const ContentElement = (
    <div
      ref={contentRef}
      css={({ colors }) => ({
        isolation: 'isolate',
        background: colors.ui.whisper,
        color: colors.gray.copy,
        position: 'absolute',
        borderColor: colors.accent,
        borderRadius: 8,
        padding: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'none',
        ...contentPositions,
        '&[data-visible]': { display: 'block' },
      })}
    >
      {content}
    </div>
  );

  const clones = Children.map(children, (child) => {
    return isValidElement(child)
      ? cloneElement(child, {
          onMouseOver: (e: MouseEvent<SupportedElement>) => {
            child.props.onMouseOver?.(e);

            if (!contentRef.current || !(e.target instanceof HTMLElement)) {
              return;
            }

            handleOpen(e.target, contentRef.current, setContentPositions, position);
          },
          onMouseOut: (e: MouseEvent<SupportedElement>) => {
            child.props.onMouseOut?.(e);

            handleClose(contentRef.current);
          },
          onFocus: (e: MouseEvent<SupportedElement>) => {
            child.props.onFocus?.(e);

            if (!contentRef.current || !(e.target instanceof HTMLElement)) {
              return;
            }

            handleOpen(e.target, contentRef.current, setContentPositions, position);
          },
          onBlur: (e: MouseEvent<SupportedElement>) => {
            child.props.onBlur?.(e);

            handleClose(contentRef.current);
          },
        })
      : child;
  });

  return (
    <>
      {clones}
      {ContentElement}
    </>
  );
};
