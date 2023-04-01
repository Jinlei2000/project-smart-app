import { createStackNavigator } from '@react-navigation/stack'
import Watchlist from './Watchlist'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Watchlist" component={Watchlist} />
    </Stack.Navigator>
  )
}
