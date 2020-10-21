import { dao } from './apiConfig';
import { pipe, filter, match, map, length, pluck, lt } from 'ramda';

const filterToConfigs = pipe(
  map(match(/.*\/?configs\/([\w_ -]+)/)),
  filter(pipe(length, lt(1))),
  pluck(1)
);

export default async (req, res) => {
  const keys = filterToConfigs(await dao.listAllKeys());

  res.status(200).json(keys);
};
