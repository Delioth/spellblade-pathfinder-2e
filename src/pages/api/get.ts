import { NextApiRequest, NextApiResponse } from 'next';
import { dao } from './apiConfig';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const keysOnly = req.query.keys !== undefined;

  const keys = await dao.listAllKeys();
  if (keysOnly) {
    res.status(200).json(keys);
  } else {
    const data = Promise.all(keys.map(dao.findDirect)).then((arr) =>
      arr.reduce((data, curr) => [...data, curr], [])
    );

    res.status(200).json(await data);
  }
};
