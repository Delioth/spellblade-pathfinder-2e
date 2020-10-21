import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import React from 'react';
import Element, { MinimalElement } from '../../../../components/ElementDisplay';
import { Button, Card, Divider, Link } from 'theme-ui';
import { dao } from '../../../api/apiConfig';
import { useRouter } from 'next/dist/client/router';
import { complement, isEmpty } from 'ramda';

const parseKey = /[\w_]+\/([\w_ -]+)\/([\w_ -]+)\/([\w_ -]+)/g;
const parse = (key: string) => {
  parseKey.lastIndex = 0;
  return parseKey.exec(key);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fullPaths = await dao.listAllKeys();
  const paths = fullPaths
    .map(parse)
    .filter((x) => x !== null)
    .map(([, context, type, element]) => ({
      params: {
        context: encodeURIComponent(context),
        type: encodeURIComponent(type),
        element: encodeURIComponent(element),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<MinimalElement> = async ({
  params,
}) => {
  const { context, type, element } = params;

  const data = await dao.findByPath(
    [context as string, type as string],
    element as string
  );

  return { props: data, revalidate: 1 };
};

const StandaloneElement: typeof Element = (props) => {
  const { push, asPath } = useRouter();

  const editPath = `${asPath}/edit`;

  return (
    <Card sx={{ width: 'fit-content', maxWidth: 'page' }}>
      <Element {...props} />
      <Divider my={4} />
      <Button onClick={() => push(editPath)}>Edit Me!</Button>
    </Card>
  );
};

export default StandaloneElement;
