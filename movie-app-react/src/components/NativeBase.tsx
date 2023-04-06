import { StatusBar } from 'expo-status-bar'
import { ColorMode, NativeBaseProvider, StorageManager } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useColorMode from '../hooks/useColorMode'
import theme from '../styles/theme'
import { useState } from 'react'

export default ({ children }: { children: React.ReactNode }) => {
  // Status bar style dark or light
  const [statusBarStyle, setStatusBarStyle] = useState<'dark' | 'light'>('dark')
  // use my own useColorMode hook
  const { setInitialColorMode } = useColorMode()

  // set first time system color mode to true
  setInitialColorMode()

  // clear all async storage
  // AsyncStorage.clear()

  // use color mode manager to store color mode in async storage of native-base
  const colorModeManager: StorageManager = {
    get: async () => {
      const storedPreference = await AsyncStorage.getItem('@color-mode')
      // console.log(storedPreference)
      setStatusBarStyle(storedPreference === 'dark' ? 'dark' : 'light')
      return storedPreference === 'dark' ? 'dark' : 'light'
    },
    set: async (value: ColorMode) => {
      // nothing (use my own useColorMode)
    },
  }

  const config = {
    dependencies: {
      'linear-gradient': require('expo-linear-gradient').LinearGradient,
    },
  }

  return (
    <NativeBaseProvider
      theme={theme}
      colorModeManager={colorModeManager}
      config={config}
    >
      <StatusBar style={statusBarStyle === 'dark' ? 'light' : 'dark'} />
      {children}
    </NativeBaseProvider>
  )
}
