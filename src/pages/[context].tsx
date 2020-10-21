import { GetStaticProps, GetStaticPaths } from 'next';
import React, { FC } from 'react';
import { MinimalElement } from '../components/ElementDisplay';
import { InputTypes } from '../util/InputTypes';
import { TextBlockElementProps } from '../elements/TextBlockElement';
import PageDisplay from '../components/PageDisplay';
import { Box } from 'theme-ui';
import { SidebarElementProps } from '../elements/SidebarElement';
import { dao } from './api/apiConfig';
import { pipe, map, chain, match } from 'ramda';

type ResolvedMainBlock = {
  columns: number;
  content: MinimalElement[];
};

export type ResolvedPageConfig = {
  head: TextBlockElementProps;
  sidebarR: SidebarElementProps;
  sidebarL: SidebarElementProps;
  main: ResolvedMainBlock;
};

export type ResolvedContextConfig = {
  pages: ResolvedPageConfig[];
};

type ElementRef<T extends InputTypes = InputTypes> = {
  type: T;
  entry: string;
  context: string;
};

type MainBlock = {
  columns: number;
  content: ElementRef[];
};

type PageConfig = {
  head: ElementRef<InputTypes.TEXTBLOCK>;
  sidebarR: ElementRef<InputTypes.SIDEBAR>;
  sidebarL: ElementRef<InputTypes.SIDEBAR>;
  main: MainBlock;
};

export type ContextConfig = {
  pages: PageConfig[];
};

const canonizeConfigs = pipe(
  chain(match(/^.+\/configs\/([\w_ -]+)$/)),
  map((context) => ({ params: { context } }))
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = canonizeConfigs(await dao.listAllKeys());

  return {
    paths,
    fallback: false,
  };
};

const getOneData: <T>(
  context: string,
  type: string,
  element: string
) => Promise<T> = async (context, type, element) => {
  if (type && element) {
    return dao.findByPath([context, type], element);
  } else return Promise.resolve(null);
};

export const getStaticProps: GetStaticProps<ResolvedContextConfig> = async ({
  params,
}) => {
  const { context } = params;
  const cs = context as string;

  const config = (await (dao.findByPath(
    ['configs'],
    cs
  ) as unknown)) as ContextConfig;

  const pages = config.pages.map(
    async ({ head, sidebarR, sidebarL, main }): Promise<ResolvedPageConfig> => {
      const resolvableHead = getOneData<TextBlockElementProps>(
        head?.context,
        head?.type,
        head?.entry
      );
      const resolvableSidebarR = getOneData<SidebarElementProps>(
        sidebarR?.context,
        sidebarR?.type,
        sidebarR?.entry
      );
      const resolvableSidebarL = getOneData<SidebarElementProps>(
        sidebarL?.context,
        sidebarL?.type,
        sidebarL?.entry
      );

      const resolvableMainBlocks = main.content.map(
        ({ context, type, entry }) =>
          getOneData<MinimalElement>(context, type, entry)
      );

      return {
        head: await resolvableHead,
        sidebarR: await resolvableSidebarR,
        sidebarL: await resolvableSidebarL,
        main: {
          columns: main.columns,
          content: await Promise.all(resolvableMainBlocks),
        },
      };
    }
  );

  return {
    props: { pages: await Promise.all(pages) },
    revalidate: 100000,
  };
};

const Context: FC<ResolvedContextConfig> = ({ pages }) => {
  return (
    <>
      {pages.map((page, i) => (
        <Box my={3} key={i}>
          <PageDisplay {...page} />
        </Box>
      ))}
    </>
  );
};

export default Context;
