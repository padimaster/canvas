'use client';

import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { Hint } from '../hint.component';

type Props = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

export default function ToolButton({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: Props) {
  return (
    <Hint label="Select" side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={'icon'}
        variant={isActive ? 'boardActive' : 'board'}
        aria-label={label}
      >
        <Icon />
      </Button>
    </Hint>
  );
}
