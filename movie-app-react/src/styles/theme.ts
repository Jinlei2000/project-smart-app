import { extendTheme } from 'native-base'
import { IColorHues } from 'native-base/lib/typescript/theme/base/colors'

// Add new colors & fonts to the theme
export default extendTheme({
  colors: {
    brand: {
      900: '#201E26',
      800: '#1E1F27',
      700: '#37373F',
      600: '#9B9B9F',
      400: '#CDCDCF',
      200: '#E6E6E7',
      50: '#FCFCFE',
    },
    extra: {
      purple: '#5C61CB',
      green: '#32CD32',
      red: '#FF6347',
      orange: '#FFA500',
      blue: '#2A69F5',
    },
  },
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter-Thin',
      },
      200: {
        normal: 'Inter-ExtraLight',
      },
      300: {
        normal: 'Inter-Light',
      },
      400: {
        normal: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-SemiBold',
      },
      700: {
        normal: 'Inter-Bold',
      },
      800: {
        normal: 'Inter-ExtraBold',
      },
      900: {
        normal: 'Inter-Black',
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
    inter: 'Inter',
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',

    // Automatically use the system color mode preference
    useSystemColorMode: true,
  },
})
