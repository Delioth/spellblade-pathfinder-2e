export type PathFinder<T> = (path: string[], id: string) => Promise<T>;
export type DirectFinder<T> = (id: string) => Promise<T>;
export type Saver<T> = (
  path: string[],
  id: string,
  data: T
) => Promise<boolean>;

export type Dao<T> = {
  findByPath: PathFinder<T>;
  findDirect: DirectFinder<T>;
  save: Saver<T>;
  listAllKeys: () => Promise<string[]>;
};
