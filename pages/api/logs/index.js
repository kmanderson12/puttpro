import clientPromise from 'utils/mongodb.js';

export default async (req, res) => {
  const db = (await clientPromise).db(process.env.MONGODB_DB);

  switch (req.method) {
    case 'GET':
      try {
        const puttLogs = await db
          .collection('putt_logs')
          .find({})
          .sort({ date: -1 })
          .toArray();
        res.status(200).json(puttLogs);
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    case 'POST':
      try {
        const newLog = await db
          .collection('putt_logs')
          .insertOne(req.body); /* create a new model in the database */
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
