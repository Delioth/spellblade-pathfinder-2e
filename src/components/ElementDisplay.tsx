import React, { FC } from 'react';
import {
  DisciplineElement,
  DisciplineElementProps,
} from '../elements/DisciplineElement';
import { FeatElement, FeatElementProps } from '../elements/FeatElement';
import { NoteElement, NoteElementProps } from '../elements/NoteElement';
import {
  SpellbladeStanceElement,
  SpellbladeStanceElementProps,
} from '../elements/SpellbladeStanceElement';
import { SpellElement, SpellElementProps } from '../elements/SpellElement';
import {
  TextBlockElement,
  TextBlockElementProps,
} from '../elements/TextBlockElement';
import { InputTypes } from '../util/InputTypes';

export interface MinimalElement {
  title: string;
  type: InputTypes;
  context: string;
  [others: string]: any;
}
const Element: FC<MinimalElement> = ({ title, type, context, ...rest }) => {
  switch (type) {
    case InputTypes.TEXTBLOCK:
      return (
        <TextBlockElement title={title} {...(rest as TextBlockElementProps)} />
      );
    case InputTypes.DISCIPLINE:
      return (
        <DisciplineElement
          title={title}
          {...(rest as DisciplineElementProps)}
        />
      );
    case InputTypes.FEAT:
      return <FeatElement title={title} {...(rest as FeatElementProps)} />;
    case InputTypes.NOTE:
      return <NoteElement title={title} {...(rest as NoteElementProps)} />;
    case InputTypes.STANCE_SPELL:
      return (
        <SpellbladeStanceElement
          title={title}
          {...(rest as SpellbladeStanceElementProps)}
        />
      );
    case InputTypes.SPELL:
      return <SpellElement title={title} {...(rest as SpellElementProps)} />;
  }

  return (
    <>
      <div>
        <h1>title: {title}</h1>
        <p>type: {type}</p>
        <p>context: {context}</p>
        <p>rest: {JSON.stringify(rest)}</p>
      </div>
    </>
  );
};

export default Element;
