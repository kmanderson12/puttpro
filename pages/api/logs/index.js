import { getSession } from 'next-auth/react';
import clientPromise from 'utils/mongodb.js';

export default async (req, res) => {
  const db = (await clientPromise).db(process.env.MONGODB_DB);
  const session = await getSession({ req });
  if (!session) {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    });
  }
  switch (req.method) {
    case 'GET':
      try {
        const user = await db.collection('users').findOne({
          email: session.user.email,
        });
        const puttLogs = await db
          .collection('putt_logs')
          .find({
            user_id: user.id,
          })
          .sort({ date: -1 })
          .toArray();
        res.status(200).json(puttLogs);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case 'POST':
      try {
        const user = await db.collection('users').findOne({
          email: session.user.email,
        });
        const data = {
          ...req.body,
          user_id: user.id,
        };
        const newLog = await db.collection('putt_logs').insertOne(data);
        res.status(201).json({ success: true, data: newLog });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
