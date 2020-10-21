import PouchDB from 'pouchdb';
import { NextApiRequest, NextApiResponse } from 'next';
import { promises } from 'fs';
const { opendir, readFile } = promises;

let db = new PouchDB('data');
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await db.destroy();
  db = new PouchDB('data');
  const data = await db.allDocs({ include_docs: true });

  const datadir = await opendir('data');
  for await (const contextdir of datadir) {
    if (contextdir.isDirectory()) {
      for await (const typedir of await opendir(`data/${contextdir.name}`)) {
        if (typedir.isDirectory()) {
          for await (const file of await opendir(
            `data/${contextdir.name}/${typedir.name}`
          )) {
            if (file.isFile()) {
              const contents = await readFile(
                `data/${contextdir.name}/${typedir.name}/${file.name}`,
                { encoding: 'utf-8' }
              );
              const { _rev, ...parsed } = JSON.parse(contents);
              try {
                await db.put(parsed);
              } catch (e) {
                console.log(e);
              }
            }
          }
        }
      }
    }
  }
  res.status(200).json({ success: 'ok' });
};
