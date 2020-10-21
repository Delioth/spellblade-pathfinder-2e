import { FC } from 'react';
import TraitDisplay from '../components/TraitDisplay';
import { MinimalElement } from '../components/ElementDisplay';
import { getTitle, HeaderType } from '../util/getTitle';
import { Box, Divider, Heading, Text } from 'theme-ui';
import Markdown from '../util/Markdown';

export interface DisciplineElementProps
  extends Omit<MinimalElement, 'type' | 'context'> {
  ability: string;
  tradition: string;
  exit_name: string;
  exit: string;
  exit_traits: string[];
  exit_time: string;
  traits: string[];
  description: string;
}

export const DisciplineElement: FC<DisciplineElementProps> = ({
  title,
  ability,
  tradition,
  exit_name,
  exit,
  exit_traits = [],
  exit_time,
  traits = [],
  description,
}) => {
  return (
    <div>
      {getTitle(title, HeaderType.h3)}
      <Text variant="blip">
        <b>Ability </b>
        {ability}
      </Text>
      <Text variant="blip">
        <b>Tradition </b>
        {tradition}
      </Text>
      <Text variant="blip">
        <b>Traits </b> {traits.join(', ')}
      </Text>
      <Box>
        <Markdown>{description}</Markdown>
      </Box>
      <Text>
        <Heading variant="h4" sx={{ pb: 2 }}>
          {exit_name} [{exit_time}]
        </Heading>
        <TraitDisplay traits={exit_traits} />
        <Markdown>{exit}</Markdown>
      </Text>
    </div>
  );
};
