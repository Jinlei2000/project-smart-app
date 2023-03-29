import { createStackNavigator } from '@react-navigation/stack'
import Category from './Category'
import Detail from './Detail'
import Home from './Home'
import Search from './Search'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Category" component={Category} />
    </Stack.Navigator>
  )
}
