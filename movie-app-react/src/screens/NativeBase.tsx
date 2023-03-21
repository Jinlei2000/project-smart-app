import AppStack from './AppStack'
import { StatusBar } from 'expo-status-bar'
import { ColorMode, NativeBaseProvider, StorageManager } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useColorMode from '../hooks/useColorMode'
import theme from '../styles/theme'

export default () => {
  const { setFirstTime, getSystemMode } = useColorMode()

  setFirstTime()
  getSystemMode().then(value => {
    console.log(`system mode: ${value}`)
  })

  // const a = extendTheme({
  //   config: {
  //     initialColorMode: 'dark',
  //     useSystemColorMode: true,
  //   },
  // })

  // use color mode manager to store color mode in async storage of native-base
  const colorModeManager: StorageManager = {
    get: async () => {
      const storedPreference = await AsyncStorage.getItem('@color-mode')
      console.log(storedPreference)
      return storedPreference === 'dark' ? 'dark' : 'light'
    },
    set: async (value: ColorMode) => {
      // nothing (use my own useColorMode)
    },
  }

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <AppStack />
    </NativeBaseProvider>
  )
}
