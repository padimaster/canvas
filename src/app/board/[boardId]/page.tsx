import { Canvas } from '@/components/canvas';
import { BoardPageLayout } from '@/components/canvas/layout';

type Props = {
  params: {
    boardId: string;
  };
};

export default async function BoardPage({ params: { boardId } }: Props) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <BoardPageLayout>
      <Canvas boardId={boardId}></Canvas>
    </BoardPageLayout>
  );
}
