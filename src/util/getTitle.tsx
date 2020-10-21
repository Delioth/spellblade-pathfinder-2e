import { Heading } from 'theme-ui';

export enum HeaderType {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

export const getTitle = (title: string, titleType: HeaderType) => {
  return <Heading variant={titleType}>{title}</Heading>;
};
