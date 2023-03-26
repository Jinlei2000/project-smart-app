import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './Profile'
import Random from './Random'
import Watchlist from './Watchlist'
import Home from './Home'
import { useColorMode, useTheme } from 'native-base'
import { HomeIcon, Bookmark, Dices, User } from 'lucide-react-native'
import React from 'react'

const Tab = createBottomTabNavigator()

enum TabScreens {
  HomeStack = 'HomeStack',
  WatchlistStack = 'WatchlistStack',
  RandomStack = 'RandomStack',
  ProfileStack = 'ProfileStack',
}

export default () => {
  const { colorMode } = useColorMode()

  const screenOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: colorMode === 'dark' ? '#282a34' : '#e0e4e7',
      blurEffect: 'dark',
      paddingBottom: 6,
      paddingTop: 8,
      padingHorizontal: 8,
      borderTopWidth: 0,
      height: 56,
    },
    tabBarLabelStyle: {
      fontSize: 11,
    },
    tabBarIconStyle: {
      paddingBottom: 4,
    },

    tabBarInactiveTintColor: colorMode === 'dark' ? '#9B9B9F' : '#6B7280',
    tabBarActiveTintColor: colorMode === 'dark' ? '#E6E6E7' : '#111827',
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={TabScreens.HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name={TabScreens.WatchlistStack}
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color, size }) => (
            <Bookmark color={color} size={size} />
          ),
        }}
        component={Watchlist}
      />
      <Tab.Screen
        name={TabScreens.RandomStack}
        options={{
          title: 'Random',
          tabBarIcon: ({ color, size }) => <Dices color={color} size={size} />,
        }}
        component={Random}
      />
      <Tab.Screen
        name={TabScreens.ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
        component={Profile}
      />
    </Tab.Navigator>
  )
}
