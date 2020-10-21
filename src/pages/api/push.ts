import PouchDB from 'pouchdb';
import { NextApiResponse, NextApiRequest } from 'next';
import config from './apiConfig';
import { InputTypes } from '../../util/InputTypes';

interface PushType {
  type: InputTypes;
  title: string;
  context: string;
}

const { dao } = config;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body: PushType = JSON.parse(req.body);
  const { title, type, context, ...rest } = body;
  const id = `${context}/${type}/${title}`;

  const success = await dao.save([context, type], title, {
    _id: id,
    title,
    type,
    context,
    lastreq: new Date().toISOString(),
    ...rest,
  });

  res.status(success ? 200 : 500).json({ ok: success });
};
