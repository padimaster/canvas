import { Info, Participants, Toolbar } from '@/components/canvas';
import { BoardPageLayout } from '@/components/canvas/layout';
import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <BoardPageLayout>
      <div className="w-full h-full relative bg-neutral-100 touch-none flex items-center justify-center">
        <Loader className="w-6 h-6 text-muted-foreground animate-spin" />
        <Info.Skeleton />
        <Participants.Skeleton />
        <Toolbar.Skeleton />
      </div>
    </BoardPageLayout>
  );
}
