import { FC } from 'react';
import TraitDisplay from '../components/TraitDisplay';
import { MinimalElement } from '../components/ElementDisplay';
import { getTitle, HeaderType } from '../util/getTitle';
import ItemHeader, { ActionType } from '../components/ItemHeader';
import Markdown from '../util/Markdown';
import { Box, Divider } from 'theme-ui';

export interface SpellbladeStanceElementProps
  extends Omit<MinimalElement, 'type' | 'context'> {
  traits: string[];
  requirements: string;
  prerequisites: string;
  trigger: string;
  level: number;
  cast_time: ActionType;
  components: string;
  passive: string;
  active: string;
  exit: string;
  focus?: boolean;
  version: string;
}

export const SpellbladeStanceElement: FC<SpellbladeStanceElementProps> = ({
  title,
  traits = [],
  requirements,
  prerequisites,
  trigger,
  level,
  cast_time,
  components,
  passive,
  active,
  exit,
  focus,
  version,
}) => {
  return (
    <div>
      <ItemHeader
        title={title}
        level={level}
        type={focus ? 'focus' : 'cantrip'}
      />
      <TraitDisplay traits={traits} />
      <Box>
        <b>Source </b> Delioth Homebrew <b>Version </b> {version}
      </Box>
      <Box>
        <b>Cast </b>[{cast_time}] {components}
      </Box>
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
        <b>Passive Benefit: </b> {passive}
      </Box>
      <Box>
        <b>Focus Spell: </b> <i>{active}</i>
      </Box>
      <Box>
        <b>Exit Condition: </b> {exit}
      </Box>
    </div>
  );
};
