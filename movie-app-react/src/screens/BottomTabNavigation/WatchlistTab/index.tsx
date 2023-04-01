import { createStackNavigator } from '@react-navigation/stack'
import Watchlist from './Watchlist'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Watchlist" component={Watchlist} />
    </Stack.Navigator>
  )
}
