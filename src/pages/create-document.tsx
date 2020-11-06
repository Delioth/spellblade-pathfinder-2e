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
} from 'ramda';
import React, {
  Dispatch,
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useSWR from 'swr';
import { Box, Button, Flex, Grid } from 'theme-ui';
import { MinimalElement } from '../components/ElementDisplay';
import PageDisplay from '../components/PageDisplay';
import PageEdit from '../components/PageEdit';
import TreeView from '../components/TreeView';
import { ContextConfig } from '../util/contextTypes';

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
const postFetcher = async (url: RequestInfo, body: any) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return res.json();
};

const splitAndIndex = pipe(partition(has('pages')), map(indexBy(prop('_id'))));
const matcher = match(/([\w_ -]+)\/([\w_ -]+)\/([\w_ -]+)$/);

export enum ActionType {
  INSERT,
  REMOVE,
  MOVE,
  ADD_PAGE,
  ALTER_COLUMNS,
  REPLACE_ALL,
}

export enum Location {
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

type EditDocumentReducer = Reducer<ContextConfig, Action>;
export type EditDocumentDispatch = Dispatch<Action>;

const reducer: EditDocumentReducer = (prevState, { type: theType, data }) => {
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
          console.log(
            'INSERT',
            prevState,
            evolve(
              {
                pages: over(
                  lens,
                  insert(data.elementIndex, { type, entry, context })
                ),
              },
              prevState
            )
          );
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

const DocumentConfigurator = () => {
  const { data: elementArray } = useSWR<MinimalElement[]>('/api/get', fetcher);
  const [configs, elements]: [
    { [x: string]: ContextConfig },
    { [x: string]: MinimalElement }
  ] = useMemo(() => splitAndIndex(elementArray ?? []) as [any, any], [
    elementArray,
  ]);

  const [selectedPage, setSelect] = useState(0);

  const configNames = useMemo(() => Object.keys(configs), [configs]);
  const elementNames = Object.keys(elements);

  const [currentConfig, dispatch] = useReducer(reducer, { pages: [] });
  const { data } = useSWR(['/api/hydrateConfig', currentConfig], postFetcher);

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

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Flex>
          <Box sx={{ flex: '1 1 auto', height: '100vh', overflowY: 'scroll' }}>
            <TreeView tree={elementTree} drag />
          </Box>
          <Box sx={{ flex: '1 1 auto' }}>
            <Flex sx={{ justifyContent: 'space-evenly', m: [2, 3] }}>
              <Button
                sx={{ mx: '6rem' }}
                onClick={() => setSelect(Math.max(selectedPage - 1, 0))}
              >
                {'🡄'}
              </Button>
              <Button
                sx={{ mx: '6rem' }}
                onClick={() =>
                  setSelect(Math.min(selectedPage + 1, data?.pages.length))
                }
              >
                {'🡆'}
              </Button>
            </Flex>
            <PageEdit
              {...(data?.pages[selectedPage] || {})}
              dispatch={dispatch}
              pageIndex={selectedPage}
            />
          </Box>
        </Flex>
      </DndProvider>
    </>
  );
};

export default DocumentConfigurator;
