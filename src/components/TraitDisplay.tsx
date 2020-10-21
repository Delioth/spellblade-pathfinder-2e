import { FC } from 'react';
import { Flex, FlexProps } from 'theme-ui';
import { complement, isEmpty, pipe, sort, filter, map } from 'ramda';

type TraitDisplayProps = {
  traits: string[];
};

const specialTraits = {
  uncommon: { bg: '#D050A0' },
  rare: { bg: 'black' },
};

const CanonTrait: FC<{ trait: string } & FlexProps> = ({
  trait,
  ...flexProps
}) => {
  return (
    <Flex
      {...flexProps}
      backgroundColor={specialTraits[trait]?.bg}
      color={specialTraits[trait]?.fg}
    >
      {trait}
    </Flex>
  );
};

const cmp = (a, b) => Number(a > b) - Number(a < b);
const prepTraits = pipe(
  sort(
    (a: string, b: string) =>
      Number(!!specialTraits[b]) - Number(!!specialTraits[a]) || cmp(a, b)
  ),
  filter(complement(isEmpty)),
  map((trait) => {
    return (
      <CanonTrait
        key={trait}
        marginX={[1, 1, 2]}
        variant="text.trait"
        trait={trait}
      />
    );
  })
);

const TraitDisplay: FC<TraitDisplayProps> = ({ traits = [] }) => {
  return (
    <Flex marginX={[-1, -1, -2]} sx={{ flexWrap: 'wrap' }}>
      {prepTraits(traits)}
    </Flex>
  );
};

export default TraitDisplay;
