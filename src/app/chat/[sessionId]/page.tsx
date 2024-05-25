import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import ChatSession from './_component/Chatsession';
import { getSessionChats } from './_lib/getSessionChats';

type Props = {
  params: { sessionId: string };
};
export default async function Page({ params }: Props) {
  const { sessionId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['session', sessionId],
    queryFn: getSessionChats,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <ChatSession sessionId={sessionId} />
    </HydrationBoundary>
  );
}
