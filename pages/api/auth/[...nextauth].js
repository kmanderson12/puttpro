import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import EmailProvider from 'next-auth/providers/email';

import clientPromise from 'utils/mongodb.js';

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    theme: {
      colorScheme: 'light',
    },
    jwt: {
      secret: process.env.SECRET,
      maxAge: 30 * 24 * 60 * 60,
    },
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.SECRET,
    providers: [
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
    adapter: MongoDBAdapter({
      db: (await clientPromise).db(process.env.MONGODB_DB),
    }),
  });
}
