import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}
