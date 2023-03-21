import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from './Home'
import Test from './Test'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  )
}
