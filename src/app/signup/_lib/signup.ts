'use server';

export default async (prevState: any, formData: FormData) => {
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id' };
  }
  if (
    !formData.get('password') ||
    !(formData.get('password') as string)?.trim()
  ) {
    return { message: 'no_password' };
  }
  if (formData.get('password') !== formData.get('passwordConfirm')) {
    return { message: 'password_mismatch' };
  }
  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/join`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    );
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    console.log(await response.json());
    shouldRedirect = true;
  } catch (error) {
    console.error(error);
    return { message: null };
  }
  return { message: null };
};
