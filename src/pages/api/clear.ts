import PouchDB from 'pouchdb';

const db = new PouchDB('data');
export default async (req, res) => {
  db.destroy();

  res.status(200).json({ ok: true });
};
