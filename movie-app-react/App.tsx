import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import Auth from './src/components/Auth'
import NativeBase from './src/components/NativeBase'

preventAutoHideAsync()

export default () => {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./src/assets/fonts/Inter-Black.otf'),
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.otf'),
    'Inter-ExtraBold': require('./src/assets/fonts/Inter-ExtraBold.otf'),
    'Inter-ExtraLight': require('./src/assets/fonts/Inter-ExtraLight.otf'),
    'Inter-Light': require('./src/assets/fonts/Inter-Light.otf'),
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.otf'),
    'Inter-Regular': require('./src/assets/fonts/Inter-Regular.otf'),
    'Inter-SemiBold': require('./src/assets/fonts/Inter-SemiBold.otf'),
    'Inter-Thin': require('./src/assets/fonts/Inter-Thin.otf'),
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
        <NativeBase>
          <Auth />
        </NativeBase>
      </NavigationContainer>
    </View>
  )
}
