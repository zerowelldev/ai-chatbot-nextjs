import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );
        // let setCookie = authResponse.headers.get('Set-Cookie');
        // console.log('set-cookie', setCookie);
        // if (setCookie) {
        //   const parsed = cookie.parse(setCookie);
        //   cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키를 심어주는 것
        // }
        console.log('여기', authResponse);

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log('user', user);
        // return {
        //   email: user.id,
        //   name: user.nickname,
        //   image: user.image,
        //   ...user,
        // };
        return user;
      },
    }),
  ],
});
