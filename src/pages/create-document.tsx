import {
  has,
  partition,
  indexBy,
  prop,
  pipe,
  map,
  adjust,
  over,
  insert,
  match,
  assoc,
  lensPath,
  dissoc,
  remove,
  move,
  evolve,
  split,
  reduce,
  set,
  forEach,
} from 'ramda';
import { Reducer, useEffect, useReducer } from 'react';
import useSWR from 'swr';
import { Box, Grid } from 'theme-ui';
import { MinimalElement } from '../components/ElementDisplay';
import TreeView, { ElementTreeViewProps } from '../components/TreeView';
import { ContextConfig } from './[context]';

const fetcher = (url) => fetch(url).then((res) => res.json());

const splitAndIndex = pipe(partition(has('pages')), map(indexBy(prop('_id'))));
const matcher = match(/([\w_ -]+)\/([\w_ -]+)\/([\w_ -]+)$/);

enum ActionType {
  INSERT,
  REMOVE,
  MOVE,
  ADD_PAGE,
  ALTER_COLUMNS,
  REPLACE_ALL,
}

enum Location {
  head = 'head',
  sidebarR = 'sidebarR',
  sidebarL = 'sidebarL',
  main = 'main',
}

type ActionData = {
  pageIndex?: number;
  elementIndex?: number;
  secondElementIndex?: number;
  location?: Location;
  element?: string;

  newConfig?: ContextConfig;
};

type Action = {
  type: ActionType;
  data: ActionData;
};

const reducer: Reducer<ContextConfig, Action> = (
  prevState,
  { type: theType, data }
) => {
  switch (theType) {
    case ActionType.INSERT:
      const [, context, type, entry] = matcher(data.element);
      switch (data.location) {
        case Location.head:
        case Location.sidebarR:
        case Location.sidebarL:
          return evolve(
            {
              pages: adjust(
                data.pageIndex,
                assoc(data.location, { type, entry, context })
              ),
            },
            prevState
          ) as ContextConfig;
        case Location.main:
          const lens = lensPath([data.pageIndex, data.location, 'content']);
          return evolve(
            {
              pages: over(
                lens,
                insert(data.elementIndex, { type, entry, context })
              ),
            },
            prevState
          ) as ContextConfig;
      }
    case ActionType.REMOVE:
      switch (data.location) {
        case Location.head:
        case Location.sidebarR:
        case Location.sidebarL:
          return evolve(
            {
              pages: adjust(data.pageIndex, dissoc(data.location)),
            },
            prevState
          ) as ContextConfig;
        case Location.main:
          const lens = lensPath([data.pageIndex, data.location, 'content']);
          return evolve(
            {
              pages: over(lens, remove(data.elementIndex, 1)),
            },
            prevState
          ) as ContextConfig;
      }
    case ActionType.MOVE:
      switch (data.location) {
        case Location.head:
        case Location.sidebarR:
        case Location.sidebarL:
          console.log(`INVALID ACTION - MOVE ${data.location}`);
          return prevState;
        case Location.main:
          const lens = lensPath([data.pageIndex, data.location, 'content']);
          return evolve(
            {
              pages: over(
                lens,
                move(data.elementIndex, data.secondElementIndex)
              ),
            },
            prevState
          ) as ContextConfig;
      }
    case ActionType.ADD_PAGE:
      return evolve(
        { pages: insert(data.pageIndex, {}) },
        prevState
      ) as ContextConfig;
    case ActionType.REPLACE_ALL:
      return data.newConfig;
    default:
      console.log('wat do');
      return prevState;
  }
};

const constructElementTree = (elementReference: {
  [x: string]: MinimalElement;
}) =>
  reduce(
    (acc, path) => set(lensPath(split('/', path)), elementReference[path], acc),
    {},
    Object.keys(elementReference)
  );

const constructElementTreeFromConfig = (cfg: ContextConfig) => {
  return {
    [(cfg as any as {_id: string})._id]: pipe(
      map(prop('main')),
      map(prop('content')),
      // @ts-ignore
      map(map((e) => assoc('title', e.entry, e))),
      // @ts-ignore
    )(cfg.pages),
  };
};

const DocumentConfigurator = () => {
  const { data: elementArray, error } = useSWR<MinimalElement[]>(
    '/api/get',
    fetcher
  );
  const [configs, elements]: [
    { [x: string]: ContextConfig },
    { [x: string]: MinimalElement }
  ] = splitAndIndex(elementArray ?? []) as [any, any];

  const configNames = Object.keys(configs);
  const elementNames = Object.keys(elements);

  const [currentConfig, dispatch] = useReducer(reducer, { pages: [] });

  useEffect(() => {
    if (configs[configNames[0]])
      dispatch({
        type: ActionType.REPLACE_ALL,
        data: {
          newConfig: configs[configNames[0]],
        },
      });
  }, [configs, configNames]);

  const elementTree = constructElementTree(elements);
  const second = (constructElementTreeFromConfig(
    currentConfig
  ) as any) as ElementTreeViewProps['tree'];

  return (
    <Grid columns={2}>
      <Box>
        <TreeView tree={elementTree} drag />
      </Box>
      <Box>
        <TreeView tree={second} drag drop />
      </Box>
    </Grid>
  );
};

export default DocumentConfigurator;
