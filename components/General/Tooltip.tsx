/** @jsxImportSource @emotion/react */

import { createPortal } from 'react-dom';
import {
  Children,
  cloneElement,
  isValidElement,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

type SupportedElement = HTMLElement;

const SIDE_OFFSET = 5;

const TOOLTIP_POSITIONS = (refEl: SupportedElement, contentEl: SupportedElement) => {
  const refRect = refEl.getBoundingClientRect();
  const contentRect = contentEl.getBoundingClientRect();
  return {
    top: {
      top: refRect.top - contentRect.height + window.scrollY - SIDE_OFFSET,
      left: refRect.left + window.scrollX - (contentRect.width - refRect.width) / 2,
    },
    right: {
      top: refRect.top + window.scrollY - (contentRect.height - refRect.height) / 2,
      left: refRect.right + window.scrollX + SIDE_OFFSET,
    },
    bottom: {
      top: refRect.bottom + window.scrollY + SIDE_OFFSET,
      left: refRect.left + window.scrollX - (contentRect.width - refRect.width) / 2,
    },
    left: {
      top: refRect.top + window.scrollY - (contentRect.height - refRect.height) / 2,
      right: refRect.right + window.scrollX - SIDE_OFFSET,
    },
  };
};

type SUPPORTED_POSITION = 'top' | 'right' | 'bottom' | 'left';

const handleOpen = (
  targetEl: SupportedElement,
  contentEl: SupportedElement,
  setStyles: any,
  position: SUPPORTED_POSITION
) => {
  contentEl.setAttribute('data-visible', 'true');
  window.requestAnimationFrame(() => {
    if (!contentEl?.offsetHeight) {
      return;
    }
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

export const Tooltip = ({ children, content, targetElement, position = 'top' }: TooltipProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [target, setTarget] = useState<SupportedElement | undefined>(targetElement);
  const [contentPositions, setContentPositions] = useState({});

  useEffect(() => {
    if (!targetElement) {
      setTarget(document?.body);
    }
  }, [targetElement]);

  const ContentElement = (
    <div
      ref={contentRef}
      css={({ colors }) => ({
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
      {target ? createPortal(ContentElement, target) : null}
    </>
  );
};
