import { FC } from 'react';
import ReactMarkdown, { ReactMarkdownProps } from 'react-markdown';
// @ts-ignore
import { BaseStyles } from 'theme-ui';

const Markdown: FC<ReactMarkdownProps> = (props) => {
  return (
    <BaseStyles>
      <ReactMarkdown {...props} />
    </BaseStyles>
  );
};
export default Markdown;
