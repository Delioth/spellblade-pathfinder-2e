import React, { FC } from 'react';
import { Box, Divider, Flex, Grid } from 'theme-ui';
import SidebarElement from '../elements/SidebarElement';
import { TextBlockElement } from '../elements/TextBlockElement';
import { ResolvedPageConfig } from '../pages/[context]';
import { HeaderType } from '../util/getTitle';
import Element from './ElementDisplay';

type PageDisplayProps = ResolvedPageConfig;

const PageDisplay: FC<PageDisplayProps> = ({ head, sidebarR, main }) => {
  return (
    <Box
      sx={{
        maxWidth: 'page',
        height: 'pageH',
        mx: 'auto',
        px: [1, 3, 6],
        py: [1, 2, 4],
        bg: 'page',
      }}
    >
      {head && (
        <>
          <TextBlockElement
            title={head.title}
            titletype={HeaderType.h1}
            markdown={head.markdown}
          />
          <Divider />
        </>
      )}
      {sidebarR && <SidebarElement side="right" markdown={sidebarR.markdown} />}
      <Flex sx={{ flexDirection: 'column', flexWrap: 'wrap', height: '100%' }}>
        {main.content.map((element, i) => {
          return (
            <Flex
              key={i}
              mx="auto"
              px={[2, 3, 3]}
              my={3}
              sx={{
                width: [
                  'calc(100%)',
                  `calc(100% / ${main.columns})`,
                  `calc(100% / ${main.columns})`,
                ],
              }}
            >
              <Element {...element} />
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default PageDisplay;
