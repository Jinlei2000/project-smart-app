import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './Profile'
import Random from './Random'
import Watchlist from './Watchlist'
import Home from './Home'

const Tab = createBottomTabNavigator()

enum TabScreens {
  HomeStack = 'HomeStack',
  WatchlistStack = 'WatchlistStack',
  RandomStack = 'RandomStack',
  ProfileStack = 'ProfileStack',
}

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={TabScreens.HomeStack}
        options={{ title: 'Home' }}
        component={Home}
      />
      <Tab.Screen
        name={TabScreens.WatchlistStack}
        options={{ title: 'Watchlist' }}
        component={Watchlist}
      />
      <Tab.Screen
        name={TabScreens.RandomStack}
        options={{ title: 'Random' }}
        component={Random}
      />
      <Tab.Screen
        name={TabScreens.ProfileStack}
        options={{ title: 'Profile' }}
        component={Profile}
      />
    </Tab.Navigator>
  )
}
