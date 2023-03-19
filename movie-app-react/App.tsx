import { NavigationContainer } from '@react-navigation/native'
import AppStack from './screens/AppStack'
import { StatusBar } from 'expo-status-bar'
import { Box, extendTheme, NativeBaseProvider, Text } from 'native-base'
import { useFonts } from 'expo-font'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'
import { useCallback } from 'react'
import { View } from 'react-native'

// preventAutoHideAsync()

export default () => {
  // const [fontsLoaded] = useFonts({
  //   'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  //   'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
  //   'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.otf'),
  //   'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.otf'),
  //   'Inter-Light': require('./assets/fonts/Inter-Light.otf'),
  //   'Inter-Medium': require('./assets/fonts/Inter-Medium.otf'),
  //   'Inter-Regular': require('./assets/fonts/Inter-Regular.otf'),
  //   'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
  //   'Inter-Thin': require('./assets/fonts/Inter-Thin.otf'),
  // })

  // // Add new colors & fonts to the theme
  // const theme = extendTheme({
  //   colors: {
  //     brand: {
  //       900: '#201E26',
  //       800: '#1E1F27',
  //       700: '#37373F',
  //       600: '#9B9B9F',
  //       400: '#CDCDCF',
  //       200: '#E6E6E7',
  //       50: '#FCFCFE',
  //     },
  //     extra: {
  //       purple: '#5C61CB',
  //       green: '#32CD32',
  //       red: '#FF6347',
  //       orange: '#FFA500',
  //       blue: '#2A69F5',
  //     },
  //   },
  //   fontConfig: {
  //     Inter: {
  //       100: {
  //         normal: 'Inter-Thin',
  //       },
  //       200: {
  //         normal: 'Inter-ExtraLight',
  //       },
  //       300: {
  //         normal: 'Inter-Light',
  //       },
  //       400: {
  //         normal: 'Inter-Regular',
  //       },
  //       500: {
  //         normal: 'Inter-Medium',
  //       },
  //       600: {
  //         normal: 'Inter-SemiBold',
  //       },
  //       700: {
  //         normal: 'Inter-Bold',
  //       },
  //       800: {
  //         normal: 'Inter-ExtraBold',
  //       },
  //       900: {
  //         normal: 'Inter-Black',
  //       },
  //     },
  //   },
  //   fonts: {
  //     heading: 'Inter',
  //     body: 'Inter',
  //     mono: 'Inter',
  //     inter: 'Inter',
  //   },
  // })

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await hideAsync()
  //   }
  // }, [fontsLoaded])

  // if (!fontsLoaded) {
  //   return null
  // }

  return (
    <View style={{ flex: 1 }} >
      <NavigationContainer>
        <StatusBar style="auto" />
        <NativeBaseProvider >
          {/* <AppStack /> */}
          <Box
            color="blue.900"
            bgColor="extra.blue"
            safeAreaTop={8}
          >
            <Text color="amber.100" fontFamily="body" fontSize="5xl" fontWeight="800">
              hello world ! ii
            </Text>
          </Box>
        </NativeBaseProvider>
      </NavigationContainer>
    </View>
  )
}
