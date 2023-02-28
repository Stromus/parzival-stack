import { createTheme } from '@mui/material/styles'

import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/variable.css'

declare module '@mui/material/styles' {
  interface Palette {
    cancel: Palette['primary']
    purple?: Palette['primary']
    blue?: Palette['primary']
    fuchsia: Palette['primary']
    magenta: Palette['primary']
  }

  interface PaletteOptions {
    cancel: PaletteOptions['primary']
    purple?: PaletteOptions['primary']
    blue?: PaletteOptions['primary']
    fuchsia: PaletteOptions['primary']
    magenta: PaletteOptions['primary']
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    cancel: true
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    background: {
      default: '#F7FBFE',
      paper: '#fff',
    },
    primary: {
      light: '#E5F2FE',
      main: '#1576AA',
      dark: '#0D4A6B',
    },
    secondary: {
      light: '#FFF7EB',
      main: '#FCAD36',
      dark: '#E18800',
    },
    error: {
      light: '#FDEAEA',
      main: '#EC2D2D',
      dark: '#A90D0D',
    },
    warning: {
      light: '#FFF2EB',
      main: '#FB8137',
      dark: '#D35406',
    },
    info: {
      light: '#E5F2FE',
      main: '#46BFFF',
      dark: '#1576AA',
    },
    success: {
      light: '#E8F9F6',
      main: '#17C3A5',
      dark: '#00876F',
    },
    cancel: {
      light: '#D8D8D8',
      main: '#6A7381',
      dark: '#262626',
    },
    purple: {
      light: '#E8E7FD',
      main: '#5E4CF2',
      dark: '#392AB5',
    },
    fuchsia: {
      light: '#FCEAF1',
      main: '#EB4988',
      dark: '#C3054F',
    },
    magenta: {
      light: '#FDF1FF',
      main: '#E675FF',
      dark: '#AF11D1',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'small' && {
            textTransform: 'unset',
            fontSize: '14px',
          }),
        }),
      },
    },
  },
})