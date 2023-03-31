import { createStackNavigator } from '@react-navigation/stack'
import Random from './Random'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Random" component={Random} />
    </Stack.Navigator>
  )
}
