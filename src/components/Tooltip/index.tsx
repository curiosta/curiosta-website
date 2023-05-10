import Typography from '@components/Typography';
import type { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

type TooltipProps = {
  children: h.JSX.Element;
  content: string;
}

const TOOLTIP_OFFSET = 5;

const Tooltip = ({ children, content }: TooltipProps) => {
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = (event: MouseEvent) => {
    if (!containerRef.current || !tooltipRef.current) return;
    const { left, top, width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
    const { width } = tooltipRef.current.getBoundingClientRect();

    let finalLeft = undefined;
    let finalTop = undefined;
    if (width + left > window.innerWidth) {
      finalLeft = (-(left + width));
    }
    finalLeft && (tooltipRef.current.style.left = finalLeft + 'px')
  }

  return (
    <div ref={containerRef} onMouseEnter={onMouseEnter} className="group relative">
      {children}
      <span ref={tooltipRef} className="absolute px-4 py-2 pointer-events-none opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all bg-gray-900 text-white rounded-md z-50">
        <Typography className="whitespace-pre" size='small/normal'>
          {content}
        </Typography>
      </span>
    </div>
  );
};

export default Tooltip;
