// import { useColorMode } from 'native-base'
// import { Appearance } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// export default () => {
//   const { colorMode, setColorMode } = useColorMode()

//   const setMode = async (mode : "dark" | "light" | "system") => {
//     if (mode === 'dark') {
//       // dark mode
//       // console.log('dark mode')
//       setColorMode('dark')
//       await AsyncStorage.setItem('@color-mode', 'dark')
//       AsyncStorage.setItem('@use-system-color-mode', 'false')
//     } else if (mode === 'light') {
//       // light mode
//       // console.log('light mode')
//       setColorMode('light')
//       await AsyncStorage.setItem('@color-mode', 'light')
//       AsyncStorage.setItem('@use-system-color-mode', 'false')
//     } else if (mode === 'system') {
//       // system mode
//       // console.log('default mode')

//       if (Appearance.getColorScheme() === 'dark') {
//         setColorMode('dark')
//         await AsyncStorage.setItem('@color-mode', 'dark')
//       } else if (Appearance.getColorScheme() === 'light') {
//         setColorMode('light')
//         await AsyncStorage.setItem('@color-mode', 'light')
//       }
//       AsyncStorage.setItem('@use-system-color-mode', 'true')
//     }
//   }

//   // Add an event handler that is fired when appearance preferences change.
//   Appearance.addChangeListener(({ colorScheme }) => {
//     AsyncStorage.getItem('@use-system-color-mode').then(IsSystemColorMode => {
//       if (IsSystemColorMode === 'true') {
//         if (colorScheme === 'dark') {
//           setColorMode('dark')
//           AsyncStorage.setItem('@color-mode', 'dark')
//         } else if (colorScheme === 'light') {
//           setColorMode('light')
//           AsyncStorage.setItem('@color-mode', 'light')
//         }
//       }
//     })
//   })

//   const getMode = () => {
//     return colorMode
//   }

//   const getSystemMode = async () => {
//     return (await AsyncStorage.getItem('@use-system-color-mode')) === 'true'
//       ? true
//       : false
//   }

//   const setFirstTime = async () => {
//     const value = await AsyncStorage.getItem('@color-mode')
//     if (value === 'true') {
//       console.log('already set', value)
//       AsyncStorage.setItem('@use-system-color-mode', 'false')
//     } else {
//       setMode('system')
//       AsyncStorage.setItem('@use-system-color-mode', 'true')
//     }
//   }

//   return {
//     setMode,
//     getMode,
//     setFirstTime,
//     getSystemMode,
//   }
// }

// refactor to use useColorMode hook

import { useColorMode } from 'native-base'
import { Appearance } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default () => {
  const { colorMode, setColorMode } = useColorMode()

  const setMode = async (mode: 'dark' | 'light' | 'system') => {
    if (mode === 'dark') {
      // dark mode
      // console.log('dark mode')
      setColorMode('dark')
      await AsyncStorage.setItem('@color-mode', 'dark')
      AsyncStorage.setItem('@use-system-color-mode', 'false')
    } else if (mode === 'light') {
      // light mode
      // console.log('light mode')
      setColorMode('light')
      await AsyncStorage.setItem('@color-mode', 'light')
      AsyncStorage.setItem('@use-system-color-mode', 'false')
    } else if (mode === 'system') {
      // system mode
      // console.log('default mode')

      if (Appearance.getColorScheme() === 'dark') {
        setColorMode('dark')
        await AsyncStorage.setItem('@color-mode', 'dark')
      } else if (Appearance.getColorScheme() === 'light') {
        setColorMode('light')
        await AsyncStorage.setItem('@color-mode', 'light')
      }
      AsyncStorage.setItem('@use-system-color-mode', 'true')
    }
  }

  // Add an event handler that is fired when appearance preferences change.
  Appearance.addChangeListener(({ colorScheme }) => {
    AsyncStorage.getItem('@use-system-color-mode').then(IsSystemColorMode => {
      if (IsSystemColorMode === 'true') {
        if (colorScheme === 'dark') {
          setColorMode('dark')
          AsyncStorage.setItem('@color-mode', 'dark')
        } else if (colorScheme === 'light') {
          setColorMode('light')
          AsyncStorage.setItem('@color-mode', 'light')
        }
      }
    })
  })

  const getMode = () => {
    return colorMode
  }

  const getSystemMode = async () => {
    return (await AsyncStorage.getItem('@use-system-color-mode')) === 'true'
      ? true
      : false
  }

  const setFirstTime = async () => {
    const value = await AsyncStorage.getItem('@color-mode')
    if (value === 'true') {
      console.log('already set', value)
      AsyncStorage.setItem('@use-system-color-mode', 'false')
    } else {
      setMode('system')
      AsyncStorage.setItem('@use-system-color-mode', 'true')
    }
  }

  return { setMode, getMode, setFirstTime, getSystemMode }
}
