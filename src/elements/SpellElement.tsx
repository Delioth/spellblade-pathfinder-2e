import { FC } from 'react';
import TraitDisplay from '../components/TraitDisplay';
import { MinimalElement } from '../components/ElementDisplay';
import ItemHeader, { ActionType } from '../components/ItemHeader';
import Markdown from '../util/Markdown';
import { Box, Divider } from 'theme-ui';

export interface SpellElementProps
  extends Omit<MinimalElement, 'type' | 'context'> {
  traits: string[];
  requirements?: string;
  prerequisites?: string;
  cost?: string;
  trigger?: string;
  level: number;
  cast_time: ActionType;
  components: string;
  markdown: string;
  focus?: boolean;
  version: string;
}

export const SpellElement: FC<SpellElementProps> = ({
  title,
  traits = [],
  requirements,
  prerequisites,
  cost,
  trigger,
  level,
  cast_time,
  components,
  markdown,
  focus,
  version,
}) => {
  return (
    <div>
      <ItemHeader
        title={title}
        level={level}
        type={focus ? 'focus' : 'spell'}
      />
      <TraitDisplay traits={traits} />
      <Box>
        <b>Source </b> Delioth Homebrew <b>Version </b> {version}
      </Box>
      <Box>
        <b>Cast </b>[{cast_time}] {components}
      </Box>
      {cost && cost !== '' && (
        <Box>
          <b>Cost</b> {cost}
        </Box>
      )}
      {requirements && (
        <Box>
          <b>Requirements</b> {requirements}
        </Box>
      )}
      {prerequisites && (
        <Box>
          <b>Prerequisites</b> {prerequisites}
        </Box>
      )}
      {trigger && (
        <Box>
          <b>Trigger</b> {trigger}
        </Box>
      )}
      <Divider />
      <Box>
        <Markdown source={markdown} />
      </Box>
    </div>
  );
};
