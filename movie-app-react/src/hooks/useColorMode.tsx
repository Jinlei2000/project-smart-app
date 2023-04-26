import { useColorMode } from 'native-base'
import { Appearance } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default () => {
  // use native-base useColorMode hook
  const { colorMode, setColorMode } = useColorMode()

  // store color mode in async storage & change color mode
  const _changeMode = async (mode: 'dark' | 'light') => {
    setColorMode(mode)
    await AsyncStorage.setItem('@color-mode', mode)
    // console.log('color mode changed', mode)
  }

  // store system color mode in async storage
  const _setSystemMode = async (value: string) => {
    await AsyncStorage.setItem('@use-system-color-mode', value)
  }

  const setMode = async (mode: 'dark' | 'light' | 'system') => {
    if (mode === 'dark' || mode === 'light') {
      _changeMode(mode)
      _setSystemMode('false')
    } else if (mode === 'system') {
      // console.log('system mode')
      // console.log(Appearance.getColorScheme())
      _changeMode(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light')
      _setSystemMode('true')
    }
  }

  // Add an event handler that is fired when appearance preferences change.
  Appearance.addChangeListener(({ colorScheme }) => {
    AsyncStorage.getItem('@use-system-color-mode').then(IsSystemColorMode => {
      if (IsSystemColorMode === 'true') {
        // console.log('system mode changed', colorScheme === 'dark' ? 'dark' : 'light')
        _changeMode(colorScheme === 'dark' ? 'dark' : 'light')
      }
    })
  })

  const getMode = () => {
    return colorMode
  }

  const getSystemModeAsync = async () => {
    const value = await AsyncStorage.getItem('@use-system-color-mode')
    return value === 'true'
  }

  const setInitialColorMode = async () => {
    const systemColorMode = await AsyncStorage.getItem('@use-system-color-mode')
    const colorMode = await AsyncStorage.getItem('@color-mode')

    // console.log(
    //   'use-system-color-mode',
    //   systemColorMode,
    //   'color-mode',
    //   colorMode,
    // )

    if (colorMode && systemColorMode) {
      // console.log('already set')
      _changeMode(colorMode === 'dark' ? 'dark' : 'light')
    } else {
      // console.log('set default')
      _setSystemMode('true')
      setMode('system')
    }
  }

  return { setMode, getMode, setInitialColorMode, getSystemModeAsync }
}
