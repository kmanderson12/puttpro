import { connectToDatabase } from '../../utils/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const puttLogs = await db.collection('putt_logs').find({}).toArray();
  res.json(puttLogs);
};
