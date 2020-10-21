import React, { FC } from 'react';
import { MinimalElement } from '../components/ElementDisplay';
import { getTitle, HeaderType } from '../util/getTitle';
import Markdown from '../util/Markdown';

export interface TextBlockElementProps
  extends Omit<MinimalElement, 'type' | 'context'> {
  markdown: string;
  titletype: HeaderType;
  level?: number;
}

export const TextBlockElement: FC<TextBlockElementProps> = ({
  title,
  titletype,
  markdown,
  level,
}) => {
  return (
    <div>
      {getTitle(title, titletype)}
      {level && <p>Level {level}</p>}
      <Markdown>{markdown}</Markdown>
    </div>
  );
};
