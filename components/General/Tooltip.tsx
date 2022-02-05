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

const TOOLTIP_POSITIONS = (refRect: SupportedElement, contentRect: SupportedElement) => ({
  top: {
    top: refRect.offsetTop - contentRect.offsetHeight - SIDE_OFFSET,
    left: refRect.offsetLeft - contentRect.offsetWidth / 2,
  },
  right: {
    top: refRect.offsetTop + (refRect.offsetHeight - contentRect.offsetHeight) / 2,
    left: refRect.offsetLeft + refRect.offsetWidth + SIDE_OFFSET,
  },
  bottom: {
    top: refRect.offsetTop + contentRect.offsetHeight / 2,
    left: refRect.offsetLeft - contentRect.offsetWidth / 2,
  },
  left: {
    top: refRect.offsetTop + (refRect.offsetHeight - contentRect.offsetHeight) / 2,
    left: refRect.offsetLeft - contentRect.offsetWidth - SIDE_OFFSET,
  },
});

type TooltipProps = PropsWithChildren<{
  content: string;
  targetElement?: SupportedElement;
  position?: 'top' | 'right' | 'bottom' | 'left';
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
            if (contentRef.current) {
              contentRef.current.setAttribute('data-visible', 'true');
              window.requestAnimationFrame(() => {
                if (!contentRef.current?.offsetHeight) {
                  return;
                }
                if (!(e.target instanceof HTMLElement)) {
                  // runtime safety for TS safety; e.target is an HTML EventTarget
                  return;
                }
                setContentPositions(TOOLTIP_POSITIONS(e.target, contentRef.current)[position]);
              });
            }
          },
          onMouseOut: (e: MouseEvent<SupportedElement>) => {
            child.props.onMouseOut?.(e);
            if (contentRef.current) {
              contentRef.current.removeAttribute('data-visible');
            }
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
