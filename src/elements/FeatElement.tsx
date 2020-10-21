import React, { FC } from 'react';
import { Box, Divider } from 'theme-ui';
import { MinimalElement } from '../components/ElementDisplay';
import ItemHeader, { ActionType } from '../components/ItemHeader';
import TraitDisplay from '../components/TraitDisplay';
import Markdown from '../util/Markdown';

export interface FeatElementProps
  extends Omit<MinimalElement, 'type' | 'context'> {
  markdown: string;
  actions: ActionType;
  feature?: boolean;
  level?: number;
  traits?: string[];
  source: string;
  version: string;
  frequency?: string;
  requirements?: string;
  prerequisites?: string;
  trigger?: string;
}

export const FeatElement: FC<FeatElementProps> = ({
  title,
  markdown,
  actions,
  feature,
  level,
  traits,
  source,
  version,
  frequency,
  requirements,
  prerequisites,
  trigger,
}) => {
  return (
    <Box m={[1]}>
      <ItemHeader
        title={title}
        type={feature ? 'Feature' : 'Feat'}
        level={level}
        action={actions}
      />
      <TraitDisplay traits={traits} />
      <Box>
        <b>Source</b> {source} <b>Version</b> {version}
      </Box>
      {frequency && frequency !== '' && (
        <Box>
          <b>Frequency</b> {frequency}
        </Box>
      )}
      {requirements && requirements !== '' && (
        <Box>
          <b>Requirements</b> {requirements}
        </Box>
      )}
      {prerequisites && prerequisites !== '' && (
        <Box>
          <b>Prerequisites</b> {prerequisites}
        </Box>
      )}
      {trigger && trigger !== '' && (
        <Box>
          <b>Trigger</b> {trigger}
        </Box>
      )}
      <Divider />
      <Markdown source={markdown} />
    </Box>
  );
};
