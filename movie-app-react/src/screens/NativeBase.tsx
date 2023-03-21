import AppStack from './AppStack'
import { StatusBar } from 'expo-status-bar'
import { ColorMode, NativeBaseProvider, StorageManager } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useColorMode from '../hooks/useColorMode'
import theme from '../styles/theme'
import { Appearance } from 'react-native'
import { useState } from 'react'

export default () => {
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

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <StatusBar style={statusBarStyle === 'dark' ? 'light' : 'dark'} />
      <AppStack />
    </NativeBaseProvider>
  )
}
