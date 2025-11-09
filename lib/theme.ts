import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  breakpoints: {
    base: '0em',    // 0px
    sm: '30em',     // 480px
    md: '48em',     // 768px (iPad portrait)
    lg: '62em',     // 992px (iPad landscape)
    xl: '80em',     // 1280px
    '2xl': '96em',  // 1536px
  },
  fonts: {
    heading: `'Playfair Display', serif`,
    body: `'Playfair Display', serif`,
  },
  colors: {
    brand: {
      50: '#f7f7f7',
      100: '#e1e1e1',
      200: '#cfcfcf',
      300: '#b1b1b1',
      400: '#9e9e9e',
      500: '#7e7e7e',
      600: '#626262',
      700: '#515151',
      800: '#3b3b3b',
      900: '#1a1a1a',
    },
    luxury: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    warm: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
        bg: 'white',
      },
      h1: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
      },
      h2: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
      },
      h3: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
      },
      h4: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
      },
      h5: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
      },
      h6: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
      },
      button: {
        fontFamily: `'Playfair Display', serif`,
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
        fontWeight: '700',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: `'Playfair Display', serif`,
        color: 'gray.900',
      },
    },
    Button: {
      baseStyle: {
        fontFamily: `'Playfair Display', serif`,
        borderRadius: '0', // Sharp corners for edgy look
        fontWeight: '600',
      },
      variants: {
        solid: {
          bg: 'luxury.700',
          color: 'white',
          _hover: {
            bg: 'luxury.800',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(3, 105, 161, 0.3)',
          },
          transition: 'all 0.2s',
        },
        outline: {
          borderColor: 'luxury.700',
          color: 'luxury.700',
          _hover: {
            bg: 'luxury.50',
            borderColor: 'luxury.800',
            color: 'luxury.800',
          },
          transition: 'all 0.2s',
        },
        accent: {
          bg: 'warm.500',
          color: 'white',
          _hover: {
            bg: 'warm.600',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '0', // Sharp corners
          border: '1px solid',
          borderColor: 'gray.200',
          boxShadow: 'none',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: '0', // Sharp corners
          borderColor: 'gray.300',
          _focus: {
            borderColor: 'gray.900',
            boxShadow: '0 0 0 1px gray.900',
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: '0',
          borderColor: 'gray.300',
          _focus: {
            borderColor: 'gray.900',
            boxShadow: '0 0 0 1px gray.900',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: '0',
        borderColor: 'gray.300',
        _focus: {
          borderColor: 'gray.900',
          boxShadow: '0 0 0 1px gray.900',
        },
      },
    },
  },
});

export default theme;

