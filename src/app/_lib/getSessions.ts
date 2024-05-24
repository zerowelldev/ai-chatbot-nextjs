export async function getSessions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/session/asdf1`, {
    next: {
      tags: ['sessions'],
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
