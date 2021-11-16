import clientPromise from 'utils/mongodb.js';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    });
  }
  const db = (await clientPromise).db(process.env.MONGODB_DB);

  switch (req.method) {
    case 'GET':
      try {
        const user = await db.collection('users').findOne({
          email: session.user.email,
        });
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
