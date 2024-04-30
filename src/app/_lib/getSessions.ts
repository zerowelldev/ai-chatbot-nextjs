export async function getSessions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/session/fd6c215a-55b7-4f83-9f00-e37eac2d560a`,
    {
      next: {
        tags: ['sessions'],
      },
      cache: 'no-store',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
