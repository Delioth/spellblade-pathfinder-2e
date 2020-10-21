import { Theme } from 'theme-ui';

const headerDefs = {
  h1: {
    color: 'primary',
    fontFamily: 'heading',
    lineHeight: 'heading',
    fontWeight: 'heading',
    fontSize: 5,
  },
  h2: {
    color: 'primary',
    fontFamily: 'heading',
    lineHeight: 'heading',
    fontWeight: 'heading',
    fontSize: 4,
  },
  h3: {
    color: 'primary',
    fontFamily: 'heading',
    lineHeight: 'heading',
    fontWeight: 'heading',
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
};

const theme: Theme = {
  useColorSchemeMediaQuery: true,
  space: [0, 2, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    page: 768,
    pageH: 1000,
  },
  fonts: {
    body: 'Candara, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading:
      '"High Tower Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  radii: ['2px', '4px', '8px'],
  colors: {
    text: '#080A30',
    inverseText: '#F0F0FF',
    page: '#f6fcff',
    background: '#000',
    primary: '#393dab',
    secondary: '#a86ec7',
    muted: '#B6B8FF',
    ruleBackground: '#B6B8FF55',
    noteBackground: '#a86ec755',
    infoBackground: '#393dab55',
    ruleText: '#080A30',
    noteText: '#080A30',
    infoText: '#080A30',
    modes: {
      dark: {
        text: '#AAADF1',
        inverseText: '#22263F',
        background: '#0D0D0D',
        page: '#222',
        primary: '#4F56FF',
        secondary: '#580C81',
        muted: '#313243',
        ruleBackground: '#0D0D0D',
        noteBackground: '#580C8155',
        infoBackground: '#4F56FF55',
        ruleText: '#AAADF1',
        noteText: '#AAADF1',
        infoText: '#AAADF1',
      },
    },
  },

  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    ...headerDefs,
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 1,
      my: 3,
    },
    a: {
      color: 'primary',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
  text: {
    ...headerDefs,
    default: {
      color: 'text',
      fontSize: 1,
    },
    blip: {
      variant: 'text.default',
      textTransform: 'capitalize',
    },
    trait: {
      bg: 'primary',
      color: 'inverseText',
      fontVariant: 'small-caps',
      textTransform: 'capitalize',
      borderRadius: '4px',
      fontSize: 1,
      paddingX: 3,
      paddingY: 0,
      my: 1,
    },
  },
  cards: {
    primary: {
      bg: 'page',
      padding: 4,
      my: [1, 3, 5],
      mx: 'auto',
      borderRadius: 2,
    },
  },
};

export default theme;
