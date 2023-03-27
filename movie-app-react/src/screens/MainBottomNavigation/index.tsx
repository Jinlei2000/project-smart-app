import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './Profile'
import Random from './Random'
import Watchlist from './Watchlist'
import Home from './Home'
import { useColorMode } from 'native-base'
import { HomeIcon, Bookmark, Dices, User } from 'lucide-react-native'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

const Tab = createBottomTabNavigator()

enum TabScreens {
  HomeStack = 'HomeStack',
  WatchlistStack = 'WatchlistStack',
  RandomStack = 'RandomStack',
  ProfileStack = 'ProfileStack',
}

export default () => {
  const stroke = Platform.OS === 'ios' ? 2.5 : 2
  const { colorMode } = useColorMode()

  let bgColor = ''
  let tabBarBg = () => {}
  if (Platform.OS !== 'ios') {
    bgColor = colorMode === 'dark' ? '#24242c' : '#e4e8eb'
    tabBarBg = () => null
  } else {
    bgColor = colorMode === 'dark' ? '#1E1F27B3' : '#F3F4F6B3'
    tabBarBg = () => (
      <BlurView
        tint={colorMode === 'dark' ? 'dark' : 'light'}
        intensity={50}
        style={StyleSheet.absoluteFill}
      />
    )
  }

  const screenOptions: any = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: bgColor,
      paddingBottom: 6,
      paddingTop: 8,
      padingHorizontal: 8,
      borderTopWidth: 0,
      height: 56,
      position: 'absolute',
    },
    tabBarLabelStyle: {
      fontSize: 11,
    },
    tabBarBackground: tabBarBg,
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
            <HomeIcon strokeWidth={stroke} color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name={TabScreens.WatchlistStack}
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color, size }) => (
            <Bookmark strokeWidth={stroke} color={color} size={size} />
          ),
        }}
        component={Watchlist}
      />
      <Tab.Screen
        name={TabScreens.RandomStack}
        options={{
          title: 'Random',
          tabBarIcon: ({ color, size }) => (
            <Dices strokeWidth={stroke} color={color} size={size} />
          ),
        }}
        component={Random}
      />
      <Tab.Screen
        name={TabScreens.ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User strokeWidth={stroke} color={color} size={size} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  )
}

StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
})
