import React, { FC } from 'react';
import { Divider, Flex, Heading } from 'theme-ui';
import TraitDisplay from './TraitDisplay';

export enum ActionType {
  none = 'none',
  free = 'free',
  reaction = 'reaction',
  one = 'one',
  two = 'two',
  three = 'three',
}

type ItemHeaderProps = {
  title: string;
  action?: ActionType;
  level?: number;
  type?: string;
};

const ItemHeader: FC<ItemHeaderProps> = ({ title, level, type, action }) => {
  return (
    <>
      <Flex>
        <Flex sx={{ flex: '1 1 auto' }}>
          <Heading as="h3">
            {title}{' '}
            {action && action !== ActionType.none ? `[${action}]` : null}
          </Heading>
        </Flex>
        {type && (
          <Flex>
            <Heading as="h3">
              {type && type[0].toUpperCase() + type.slice(1)}
              {level ? ` ${level}` : null}
            </Heading>
          </Flex>
        )}
      </Flex>
      <Divider />
    </>
  );
};

export default ItemHeader;
