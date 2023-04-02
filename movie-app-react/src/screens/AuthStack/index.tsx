import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import Login from './Login'

const Stack = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  headerShown: false,
}

export default () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
)
