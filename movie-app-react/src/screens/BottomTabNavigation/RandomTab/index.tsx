import { createStackNavigator } from '@react-navigation/stack'
import Random from './Random'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Random" component={Random} />
    </Stack.Navigator>
  )
}
