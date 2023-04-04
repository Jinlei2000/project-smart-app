import { createStackNavigator } from '@react-navigation/stack'
import Search from './Search'
import Detail from './Detail'
import ViewAll from './ViewAll'
import Rating from './Rating'
import BottomTabNavigation from '../BottomTabNavigation'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeBottomTabs" component={BottomTabNavigation} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="Rating" component={Rating} />
      {/* <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Rated" component={Rated} /> */}
    </Stack.Navigator>
  )
}