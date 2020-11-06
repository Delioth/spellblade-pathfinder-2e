import { relative } from 'path';
import React, { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Box, BoxProps, Button, Divider, Flex } from 'theme-ui';
import SidebarElement from '../elements/SidebarElement';
import { TextBlockElement } from '../elements/TextBlockElement';
import {
  EditDocumentDispatch,
  ActionType,
  Location,
} from '../pages/create-document';
import { ResolvedPageConfig } from '../util/contextTypes';
import { HeaderType } from '../util/getTitle';
import Element from './ElementDisplay';

const HoverBox: FC<
  BoxProps & { onDrop: () => void; onKill: () => void; hideClose?: boolean }
> = ({ onDrop, onKill, hideClose, children, ...boxProps }) => {
  const [{ isOver }, ref] = useDrop({
    accept: 'ELEMENT',
    drop: (i, m) => (m.didDrop() ? null : onDrop(i)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  });

  const [hover, setHover] = useState(false);

  return (
    <Box
      {...boxProps}
      backgroundColor={isOver ? '#580C8155' : null}
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <>
        {!hideClose && (
          <Button
            sx={{
              fontSize: '8px',
              float: 'right',
              height: '1rem',
              display: hover ? '' : 'none',
            }}
            onClick={onKill}
          >
            X
          </Button>
        )}
        {children}
      </>
    </Box>
  );
};

type PageEditProps = ResolvedPageConfig & {
  dispatch: EditDocumentDispatch;
  pageIndex: number;
};

const PageDisplay: FC<PageEditProps> = ({
  head,
  sidebarR,
  sidebarL,
  main,
  dispatch,
  pageIndex,
}) => {
  const [ready4Head, setHeadUp] = useState(false);
  const [ready4Left, setLeftUp] = useState(false);
  const [ready4Rite, setRiteUp] = useState(false);

  return (
    <>
      <Flex
        sx={{
          justifyContent: 'center',
          marginTop: '-2rem',
          marginBottom: '1rem',
        }}
      >
        {!head && (
          <Button
            sx={{
              fontSize: '12px',
              height: '1.5rem',
              mx: '2px',
            }}
            onClick={() => setHeadUp(!ready4Head)}
          >
            Add Header
          </Button>
        )}
        {!sidebarL && (
          <Button
            sx={{
              fontSize: '12px',
              height: '1.5rem',
              mx: '2px',
            }}
            onClick={() => setLeftUp(!ready4Left)}
          >
            Add Left Sidebar
          </Button>
        )}
        {!sidebarR && (
          <Button
            sx={{
              fontSize: '12px',
              height: '1.5rem',
              mx: '2px',
            }}
            onClick={() => setRiteUp(!ready4Rite)}
          >
            Add Right Sidebar
          </Button>
        )}
      </Flex>
      <HoverBox
        sx={{
          width: 'page',
          height: 'pageH',
          mx: 'auto',
          px: [1, 3, 6],
          py: [1, 2, 4],
          bg: 'page',
        }}
        onDrop={(event: { id: string[] }) =>
          dispatch({
            type: ActionType.INSERT,
            data: {
              location: Location.main,
              element: event.id.join('/'),
              elementIndex: 0,
              pageIndex,
            },
          })
        }
        hideClose
      >
        {ready4Head && (
          <HoverBox
            onDrop={(event: { id: string[] }) => {
              dispatch({
                type: ActionType.INSERT,
                data: {
                  location: Location.head,
                  element: event.id.join('/'),
                  pageIndex,
                },
              });
              setHeadUp(false);
            }}
            onKill={() => setHeadUp(false)}
          >
            Drop Header Here
          </HoverBox>
        )}
        {ready4Left && (
          <HoverBox
            onDrop={(event: { id: string[] }) => {
              dispatch({
                type: ActionType.INSERT,
                data: {
                  location: Location.sidebarL,
                  element: event.id.join('/'),
                  pageIndex,
                },
              });
              setLeftUp(false);
            }}
            onKill={() => setLeftUp(false)}
          >
            Drop Left Sidebar Here
          </HoverBox>
        )}
        {ready4Rite && (
          <HoverBox
            onDrop={(event: { id: string[] }) => {
              dispatch({
                type: ActionType.INSERT,
                data: {
                  location: Location.sidebarR,
                  element: event.id.join('/'),
                  pageIndex,
                },
              });
              setRiteUp(false);
            }}
            onKill={() => setRiteUp(false)}
          >
            Drop Right Sidebar Here
          </HoverBox>
        )}
        {head && (
          <HoverBox
            onDrop={(event: { id: string[] }) =>
              dispatch({
                type: ActionType.INSERT,
                data: {
                  location: Location.head,
                  element: event.id.join('/'),
                  pageIndex,
                },
              })
            }
            onKill={(event: { id: string[] }) => {
              dispatch({
                type: ActionType.REMOVE,
                data: {
                  location: Location.head,
                  pageIndex,
                },
              });
            }}
          >
            <TextBlockElement
              title={head.title}
              titletype={HeaderType.h1}
              markdown={head.markdown}
            />
            <Divider />
          </HoverBox>
        )}
        {sidebarR && (
          <HoverBox
            sx={{ width: '30%', float: 'right' }}
            onDrop={(event: { id: string[] }) =>
              dispatch({
                type: ActionType.INSERT,
                data: {
                  location: Location.sidebarR,
                  element: event.id.join('/'),
                  pageIndex,
                },
              })
            }
            onKill={(event: { id: string[] }) => {
              dispatch({
                type: ActionType.REMOVE,
                data: {
                  location: Location.sidebarR,
                  pageIndex,
                },
              });
            }}
          >
            <SidebarElement
              side="right"
              markdown={sidebarR.markdown}
              fullWidth
            />
          </HoverBox>
        )}
        {sidebarL && (
          <HoverBox
            sx={{ width: '30%', float: 'left' }}
            onDrop={(event: { id: string[] }) =>
              dispatch({
                type: ActionType.INSERT,
                data: {
                  location: Location.sidebarL,
                  element: event.id.join('/'),
                  pageIndex,
                },
              })
            }
            onKill={(event: { id: string[] }) => {
              dispatch({
                type: ActionType.REMOVE,
                data: {
                  location: Location.sidebarL,
                  pageIndex,
                },
              });
            }}
          >
            <SidebarElement
              side="left"
              markdown={sidebarL.markdown}
              fullWidth
            />
          </HoverBox>
        )}
        <Flex
          sx={{ flexDirection: 'column', flexWrap: 'wrap', height: '100%' }}
        >
          {main?.content.map((element, i) => {
            return (
              <Flex
                key={i}
                mx="auto"
                px={[2, 3, 3]}
                my={3}
                sx={{
                  width: [
                    'calc(100%)',
                    `calc(100% / ${main.columns})`,
                    `calc(100% / ${main.columns})`,
                  ],
                }}
              >
                <HoverBox
                  onDrop={(event: { id: string[] }) =>
                    dispatch({
                      type: ActionType.INSERT,
                      data: {
                        location: Location.main,
                        element: event.id.join('/'),
                        elementIndex: i,
                        pageIndex,
                      },
                    })
                  }
                  onKill={(event: { id: string[] }) => {
                    dispatch({
                      type: ActionType.REMOVE,
                      data: {
                        location: Location.main,
                        elementIndex: i,
                        pageIndex,
                      },
                    });
                  }}
                >
                  <Element {...element} />
                </HoverBox>
              </Flex>
            );
          })}
        </Flex>
      </HoverBox>
    </>
  );
};

export default PageDisplay;
