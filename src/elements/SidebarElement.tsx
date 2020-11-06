import { FC } from 'react';
// @ts-ignore
import { Box, ThemeProvider, Theme, useThemeUI } from 'theme-ui';
import { MinimalElement } from '../components/ElementDisplay';
import Markdown from '../util/Markdown';
export interface SidebarElementProps
  extends Omit<MinimalElement, 'type' | 'context' | 'title'> {
  markdown: string;
  side: 'left' | 'right';
  fullWidth?: boolean;
}

const baseSidebarStyles = (fullwidth: boolean) => ({
  borderColor: 'gray',
  width: fullwidth ? '100%' : '30%',
});

const sidebarTheme: (t: Theme) => Theme = (t) => ({
  ...t,
  fontSizes: [11, 13, 14, 16, 18, 22],
  styles: {
    h1: {
      color: 'primary',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
      marginBlockEnd: 1,
    },
    h2: {
      color: 'primary',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
      marginBlockEnd: 1,
    },
    h3: {
      color: 'primary',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      marginBlockEnd: 0,
      fontSize: 3,
    },
    h4: {
      color: 'primary',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      color: 'primary',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      color: 'primary',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      color: 'primary',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 1,
      my: 1,
    },
  },
});

const BORDER_SIZE = '1px';

const SidebarElement: FC<SidebarElementProps> = ({ markdown, side, fullWidth }) => {
  if (side === 'right') {
    return (
      <Box
        px={3}
        sx={{
          ...baseSidebarStyles(fullWidth),
          borderLeftStyle: 'solid',
          borderLeftWidth: BORDER_SIZE,
          float: 'right'
        }}
      >
        <ThemeProvider theme={sidebarTheme}>
          <Markdown>{markdown}</Markdown>
        </ThemeProvider>
      </Box>
    );
  }
  return (
    <Box
      px={3}
      sx={{
        ...baseSidebarStyles(fullWidth),
        borderRightStyle: 'solid',
        borderRightWidth: BORDER_SIZE,
        float: 'left',
      }}
    >
      <ThemeProvider theme={sidebarTheme}>
        <Markdown>{markdown}</Markdown>
      </ThemeProvider>
    </Box>
  );
};

export default SidebarElement;
