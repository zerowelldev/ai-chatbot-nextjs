import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import cookie from 'cookie';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    jwt({ token }) {
      // console.log('auth.ts jwt', token);
      return token;
    },
    session({ session, token }) {
      // console.log('session callback', session, token);
      return session;
    },
  },
  events: {},
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
        console.log(authResponse.status, authResponse.statusText);
        if (!authResponse.ok) {
          const credentialsSignin = new CredentialsSignin();
          if (authResponse.status === 404) {
            credentialsSignin.code = 'invalid_auth';
          }
          throw credentialsSignin;
        }

        let setCookie = authResponse.headers.get('Set-Cookie');
        console.log('set-cookie', setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set('connect.sid', parsed['connect.sid'], parsed);
        }

        const user = await authResponse.json();
        console.log(user);

        return {
          email: user.userId,
        };
      },
    }),
  ],
});
