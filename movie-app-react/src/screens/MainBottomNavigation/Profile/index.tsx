import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}
