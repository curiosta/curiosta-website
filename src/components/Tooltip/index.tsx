import Typography from '@components/Typography';
import type { VariantProps } from 'class-variance-authority';
import type { h } from 'preact';
import tooltip from './tooltip.cva';
import { cx } from 'class-variance-authority';
import { createPortal } from 'preact/compat';

type TooltipProps = VariantProps<typeof tooltip> & {
  children: h.JSX.Element;
  content: string;
}

const Tooltip = ({ children, content, placement }: TooltipProps) => {

  return (
    <div className="group relative">
      {children}
      {createPortal(
        <span className={cx(tooltip({ placement }))}>
          <Typography className="whitespace-pre" size='small/normal'>
            {content}
          </Typography>
          <svg class="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
        </span>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;
