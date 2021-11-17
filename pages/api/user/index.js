import clientPromise from 'utils/mongodb.js';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.send({
      error: 'You sign in to perform this action.',
    });
  }
  const db = (await clientPromise).db(process.env.MONGODB_DB);

  switch (req.method) {
    case 'GET':
      return await getUser();
    case 'PUT':
      return await updateUser();
    default:
      return res.status(400).json({ success: false });
  }

  async function getUser() {
    const user = await db
      .collection('users')
      .findOne({
        email: session.user.email,
      })
      .catch((error) => res.status(400).json(error));
    return res.status(200).json(user);
  }

  async function updateUser() {
    const data = req.body;
    const user = await db
      .collection('users')
      .updateOne(
        {
          email: session.user.email,
        },
        {
          $set: {
            name: data.name,
            location: data.location,
            imageURL: data.imageURL,
          },
        }
      )
      .catch((error) => res.status(400).json(error));
    return res.status(200).json(user);
  }
};
