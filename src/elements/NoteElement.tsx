import { FC } from 'react';
import { Box, Theme, ThemeProvider } from 'theme-ui';
import { MinimalElement } from '../components/ElementDisplay';
import { getTitle, HeaderType } from '../util/getTitle';
import Markdown from '../util/Markdown';

enum NoteType {
  rule = 'rule',
  note = 'note',
  info = 'info',
}

export interface NoteElementProps
  extends Omit<MinimalElement, 'type' | 'context'> {
  markdown: string;
  notetype: NoteType;
  titletype: HeaderType;
}

export const NoteElement: FC<NoteElementProps> = ({
  title,
  titletype = HeaderType.h3,
  notetype = NoteType.info,
  markdown,
}) => {
  const bg = `${notetype}Background`;
  const color = `${notetype}Text`;
  return (
    <Box bg={bg} sx={{ borderRadius: '6px' }} p={3}>
      <ThemeProvider
        // @ts-ignore
        theme={(theme: Theme) => ({
          ...theme,
          fontSizes: [11, 13, 14, 16, 18, 22],
          space: [0, 0, 0, 4, 0, 0],
          text: {
            ...theme.text,
            h1: {
              ...theme.text.h1,
              textAlign: 'center',
              color,
            },
            h2: {
              ...theme.text.h2,
              textAlign: 'center',
              color,
            },
            h3: {
              ...theme.text.h3,
              textAlign: 'center',
              color,
            },
            h4: {
              ...theme.text.h4,
              textAlign: 'center',
              color,
            },
            h5: {
              ...theme.text.h5,
              textAlign: 'center',
              color,
            },
            h6: {
              ...theme.text.h6,
              textAlign: 'center',
              color,
            },
          },
          styles: {
            ...theme.styles,
            p: {
              ...theme.styles.p,
              color,
            },
          },
        })}
      >
        {getTitle(title, titletype)}
        <Markdown>{markdown}</Markdown>
      </ThemeProvider>
    </Box>
  );
};
