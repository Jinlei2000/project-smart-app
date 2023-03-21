import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { extendTheme } from 'native-base'
import { useFonts } from 'expo-font'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'

import NativeBase from './src/screens/NativeBase'

preventAutoHideAsync()

export default () => {
  // Add new colors & fonts to the theme
  let theme = extendTheme({
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
    // config: {
    //   // Changing initialColorMode to 'dark'
    //   initialColorMode: 'dark',

    //   // Automatically use the system color mode preference
    //   useSystemColorMode: false,
    // },
  })

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
    'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.otf'),
    'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.otf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.otf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
    'Inter-Thin': require('./assets/fonts/Inter-Thin.otf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <NativeBase />
      </NavigationContainer>
    </View>
  )
}
