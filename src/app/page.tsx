import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import Main from './_component/Main';
import { getSessions } from './_lib/getSessions';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <Main me={session} />
    </HydrationBoundary>
  );
}
