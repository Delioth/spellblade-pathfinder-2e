import React, { createContext, FC, useContext, useMemo, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { Box, Heading } from 'theme-ui';
import { MinimalElement } from './ElementDisplay';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CollectingName = createContext<string[]>([]);
const useCollect = (addition?: string) => {
  const name = useContext(CollectingName);
  if(addition) return [...name, addition];
  return name;
}
const Named = ({name, children}) => {
  const fullname = useCollect(name);
  return <CollectingName.Provider value={fullname}>{children}</CollectingName.Provider>
}

type TypeViewProps = {
  name: string;
  tree: {
    [name: string]: MinimalElement;
  };
};

type ContextViewProps = {
  name: string;
  tree: {
    [type: string]: {
      [name: string]: MinimalElement;
    };
  };
};

export type ElementTreeViewProps = {
  drag?: boolean;
  drop?: boolean;
  tree: {
    [context: string]: {
      [type: string]: {
        [name: string]: MinimalElement;
      };
    };
  };
};

const DragDropContext = createContext({ drag: false, drop: false });

const ElementView: FC<MinimalElement> = ({ title }) => {
  const id = useCollect(title)
  const { drag: doesDrag, drop: doesDrop } = useContext(DragDropContext);
  const [, drag] = useDrag(
    doesDrag ? { item: { type: 'ELEMENT', id } } : null
  );

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: 'blue',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        margin: '0.5rem',
        height: '2.5rem',
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {title}
    </div>
  );
};

const TypeView: FC<TypeViewProps> = ({ name, tree }) => {
  const [open, set] = useState(false);
  const { drop } = useContext(DragDropContext);
  const [collectedProps, ref] = useDrop({
    accept: 'ELEMENT',
    drop: (e, b) => console.log("DROP: ", e, b),
  });

  return (
    <Box ref={ref}>
      <Box
        bg="infoBackground"
        p={2}
        px={4}
        my={2}
        sx={{ borderRadius: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          set(!open);
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            transition: 'transform 0.25s ease-in-out',
            transform: `rotate(${open ? '180deg' : '90deg'})`,
          }}
        >
          ▲
        </Box>
        <Heading as="h3" my={3} sx={{ display: 'inline-block' }} px={2}>
          {name}
        </Heading>
      </Box>
      <Box
        sx={{
          borderRadius: '1rem',
          border: open && '1px solid grey',
          display: open ? 'block' : 'none',
          overflow: 'hidden',
        }}
      >
        {Object.keys(tree).map((key) => (
          <Named name={name}key={key}><ElementView {...tree[key]} /></Named>
        ))}
      </Box>
    </Box>
  );
};

const ContextView: FC<ContextViewProps> = ({ name, tree }) => {
  const [open, set] = useState(false);

  return (
    <Box my={2}>
      <Box
        bg="noteBackground"
        p={2}
        px={4}
        sx={{ borderRadius: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          set(!open);
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            transition: 'transform 0.1s ease-in-out',
            transform: `rotate(${open ? '180deg' : '90deg'})`,
          }}
        >
          ▲
        </Box>
        <Heading as="h2" sx={{ display: 'inline-block' }} px={3}>
          {name}
        </Heading>
      </Box>
      <Box
        px={[2, 3, 4]}
        mx={3}
        sx={{
          maxHeight: open ? '100%' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.25s ease-in-out',
          borderLeft: 'solid 2px',
          borderColor: 'noteBackground',
        }}
      >
        {Object.keys(tree).map((key) => (
          <Named name={name} key={key}>
            <TypeView  name={key} tree={tree[key]} />
          </Named>
        ))}
      </Box>
    </Box>
  );
};

const TreeView: FC<ElementTreeViewProps> = ({ tree, drag, drop }) => {
  const memoVal = useMemo(() => ({ drag, drop }), [drag, drop]);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <DragDropContext.Provider value={memoVal}>
          {Object.keys(tree).map((key) => (
            <ContextView key={key} name={key} tree={tree[key]} />
          ))}
        </DragDropContext.Provider>
      </DndProvider>
    </>
  );
};

export default TreeView;
