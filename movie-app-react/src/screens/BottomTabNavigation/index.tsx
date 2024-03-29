import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from './ProfileTab/Profile'
import Random from './RandomTab/Random'
import Watchlist from './WatchlistTab/Watchlist'
import Home from './HomeTab/Home'
import { View, useColorMode, useTheme } from 'native-base'
import { HomeIcon, Bookmark, Dices, User } from 'lucide-react-native'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()

enum TabScreens {
  HomeTab = 'HomeTab',
  WatchlistTab = 'WatchlistTab',
  RandomTab = 'RandomTab',
  ProfileTab = 'ProfileTab',
}

export default () => {
  const stroke = Platform.OS === 'ios' ? 2.5 : 2
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  let bgColor = ''
  let tabBarBg = () => {}
  if (Platform.OS !== 'ios') {
    bgColor = colorMode === 'dark' ? colors.brand[800] : colors.coolGray[100]
    tabBarBg = () => (
      <SafeAreaView style={{ flex: 1 }}>
        <View shadow={2} />
      </SafeAreaView>
    )
  } else {
    bgColor = colorMode === 'dark' ? '#1E1F27B3' : '#F3F4F6B3'
    tabBarBg = () => (
      <SafeAreaView style={{ flex: 1 }}>
        <BlurView
          tint={colorMode === 'dark' ? 'dark' : 'light'}
          intensity={50}
          style={StyleSheet.absoluteFill}
        />
      </SafeAreaView>
    )
  }

  const screenOptions: any = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: bgColor,
      paddingTop: 8,
      padingHorizontal: 8,
      borderTopWidth: 0,
      position: 'absolute',
    },
    tabBarLabelStyle: {
      fontSize: 11,
    },
    tabBarBackground: tabBarBg,
    tabBarInactiveTintColor:
      colorMode === 'dark' ? colors.brand[600] : colors.coolGray[500],
    tabBarActiveTintColor:
      colorMode === 'dark' ? colors.brand[200] : colors.coolGray[900],
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={TabScreens.HomeTab}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon strokeWidth={stroke} color={color} size={24} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name={TabScreens.WatchlistTab}
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color }) => (
            <Bookmark strokeWidth={stroke} color={color} size={24} />
          ),
        }}
        component={Watchlist}
      />
      <Tab.Screen
        name={TabScreens.RandomTab}
        options={{
          title: 'Random',
          tabBarIcon: ({ color }) => (
            <Dices strokeWidth={stroke} color={color} size={24} />
          ),
        }}
        component={Random}
      />
      <Tab.Screen
        name={TabScreens.ProfileTab}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <User strokeWidth={stroke} color={color} size={24} />
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
