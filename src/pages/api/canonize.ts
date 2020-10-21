// Canonize the database into a data file structure
import PouchDB from 'pouchdb';
import { NextApiRequest, NextApiResponse } from 'next';
import { lensPath, set } from 'ramda';
import { promises } from 'fs';
const { mkdir, writeFile } = promises;

const db = new PouchDB('data');
const re = /([\w-]+)\/([\w-]+)\/([\w -]+)/;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const docs = await db.allDocs({ include_docs: true });

  const i = docs.rows
    .map((o) => o.doc)
    .reduce((acc, doc) => {
      const [, ...parts] = doc._id.match(re) ?? [];
      if (parts.length === 3) {
        const lens = lensPath(parts);
        return set(lens, doc, acc);
      }
      return acc;
    }, {});

  try {
    await mkdir('data');
  } catch {}
  // Take what's in the database, and canonize it out to a file structure
  for (const [context, type] of Object.entries(i)) {
    try {
      await mkdir(`data/${context}`);
    } catch {}
    for (const [typeKey, typeObjs] of Object.entries(type)) {
      try {
        await mkdir(`data/${context}/${typeKey}`);
      } catch {}
      for (const [key, fulldoc] of Object.entries(typeObjs)) {
        const { _rev, ...doc } = fulldoc as { _rev: any };
        writeFile(
          `data/${context}/${typeKey}/${key}.json`,
          JSON.stringify({ title: key, ...(doc as object) }, undefined, 2),
          null
        );
      }
    }
  }

  res.status(200).json({ success: true });
};
