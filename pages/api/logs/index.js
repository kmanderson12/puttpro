import { getSession } from 'next-auth/react';
import clientPromise from 'utils/mongodb.js';

export default async (req, res) => {
  const db = (await clientPromise).db(process.env.MONGODB_DB);
  const session = await getSession({ req });
  if (!session) {
    return res.send({
      error: 'You sign in to perform this action.',
    });
  }

  const user = await db.collection('users').findOne({
    email: session.user.email,
  });

  switch (req.method) {
    case 'GET':
      return await getUserLogs();
    case 'POST':
      return await newLog();
    default:
      return res.status(400).json({ success: false });
  }

  async function getUserLogs() {
    const puttLogs = await db
      .collection('putt_logs')
      .find({
        user_id: user.id,
      })
      .sort({ date: -1 })
      .toArray()
      .catch((error) => res.status(400).json(error));
    return res.status(200).json(puttLogs);
  }

  async function newLog() {
    const data = {
      ...req.body,
      user_id: user.id,
    };
    const newLog = await db
      .collection('putt_logs')
      .insertOne(data)
      .catch((error) => res.status(400).json(error));
    return res.status(201).json({ success: true, data: newLog });
  }
};
