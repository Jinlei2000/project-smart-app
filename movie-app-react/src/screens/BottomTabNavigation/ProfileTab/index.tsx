import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}
