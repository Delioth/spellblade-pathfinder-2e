import PouchDB from 'pouchdb';
import { MinimalElement } from '../../components/ElementDisplay';
import { PathFinder, Saver, Dao, DirectFinder } from './Dao';

let db = new PouchDB('data');
const save: Saver<MinimalElement> = async (path, id, data) => {
  const key = `${path.join('/')}/${id}`;
  const { _rev } = await db.get(key);
  return (await db.put({ _id: key, _rev, ...data })).ok;
};

const findByPath: PathFinder<MinimalElement> = async (path, id) => {
  const key = `${path.join('/')}/${id}}`;
  return db.get(key);
};

const findDirect: DirectFinder<MinimalElement> = async (key) => {
  return db.get(key);
};

const listAllKeys = async () => {
  const docs = await db.allDocs({ include_docs: true });
  return docs.rows.reduce((p, c) => [...p, c], []);
};

const PouchDbDao: Dao<MinimalElement> = {
  save,
  findByPath,
  findDirect,
  listAllKeys,
};
export default PouchDbDao;
