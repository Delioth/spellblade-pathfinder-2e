import { promises } from 'fs';
import { MinimalElement } from '../../components/ElementDisplay';
import { Dao, Saver, PathFinder, DirectFinder } from './Dao';
import { blue, red, green } from 'chalk';
const { mkdir, writeFile, readFile, opendir } = promises;

const DATA_DIR = 'real_data';

const CACHE: { [key: string]: MinimalElement } = {};

const timelog = () => blue(new Date().toLocaleTimeString('en-US'));
const DO_LOG = true;

const findDirect: DirectFinder<MinimalElement> = async (key) => {
  const newest = readFile(`${key}.json`, {
    encoding: 'utf-8',
  })
    .then(JSON.parse)
    .then((val) => {
      DO_LOG && console.log(blue(`Caching: ${key} - `), timelog());
      return val;
    })
    .then((data: MinimalElement) => {
      CACHE[key] = data;
      return data;
    });
  const cached = CACHE[key];
  if (cached) {
    DO_LOG && console.log(green(`Cache hit: ${key} - `), timelog());
    return cached;
  }
  DO_LOG && console.log(red(`Cache miss: ${key} - `), timelog());
  return await newest;
};

const findByPath: PathFinder<MinimalElement> = async (path, id) => {
  const key = `${[DATA_DIR, ...path].join('/')}/${id}`;
  return findDirect(key);
};

const createDirectoryPath = async (
  [nextPath, ...paths]: string[],
  priorPath?: string
): Promise<string> => {
  const newFullPath = priorPath ? `${priorPath}/${nextPath}` : nextPath;
  try {
    await mkdir(newFullPath);
  } catch { }
  if (paths.length) {
    return await createDirectoryPath(paths, newFullPath);
  }
  return newFullPath;
};

const save: Saver<MinimalElement> = async (path, id, data) => {
  const dirPath = createDirectoryPath([DATA_DIR, ...path]);

  const jsonData = JSON.stringify(data, undefined, 2);
  const key = `${await dirPath}/${id}`;
  return writeFile(`${key}.json`, jsonData, null)
    .then(() => {
      CACHE[key] = data;
    })
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });
};

const recurseKeys = async (dirPath: string): Promise<string[]> => {
  const datadir = await opendir(dirPath);
  const awaitables: Promise<string[]>[] = [];
  const keys: string[] = [];
  for await (const entry of datadir) {
    const entryname = `${dirPath}/${entry.name}`;
    if (entry.isDirectory()) {
      awaitables.push(recurseKeys(entryname));
    }
    if (entry.isFile()) {
      keys.push(entryname.split('.')[0]);
    }
  }
  const datas = await Promise.all(awaitables);
  return [...keys, ...datas.reduce((prev, curr) => [...prev, ...curr], [])];
};

const listAllKeys = async () => {
  return recurseKeys(DATA_DIR);
};

const FileSystemDao: Dao<MinimalElement> = {
  save,
  findByPath,
  findDirect,
  listAllKeys,
};
export default FileSystemDao;
