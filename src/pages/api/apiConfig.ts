import { MinimalElement } from '../../components/ElementDisplay';
import { Dao } from '../../util/dao/Dao';
import FileSystemDao from '../../util/dao/FileSystemDao';

export type ApiConfig = {
  dao: Dao<MinimalElement>;
};

export const dao = FileSystemDao;

const config: ApiConfig = {
  dao,
};
export default config;
