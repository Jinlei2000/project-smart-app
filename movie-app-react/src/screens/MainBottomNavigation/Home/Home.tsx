import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  Button,
  FlatList,
  Flex,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import Main from '../../../components/generic/Main'
import NavHeader from '../../../components/header/NavHeader'
import CategoryList from '../../../components/list/CategoryList'
import useApi from '../../../hooks/useApi'
import { ICategory } from '../../../interfaces/ICategory'
import { btnProps, textProps } from '../../../styles/props'

export default () => {
  const { getCategories } = useApi()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const [categories, setCategories] = useState<ICategory[]>([])

  useEffect(() => {
    getCategories().then((data: ICategory[]) => {
      setCategories(data)
    })
  }, [])

  return (
    <>
      <NavHeader
        navBarOptions={{
          left: 'Name&Text',
          right: 'Search&Profile',
        }}
      />
      <Main>
        <VStack space={6}>
          {/* Categories */}
          <VStack space={3}>
            <Text
              fontSize={20}
              fontWeight="semibold"
              {...textProps.primaryColor}
              px={6}
            >
              Categories
            </Text>
            <CategoryList categories={categories} />
          </VStack>

          {/* Now Playing */}
          <VStack space={4}>
            <HStack
              justifyContent={'space-between'}
              alignItems={'flex-end'}
              px={6}
            >
              <Text
                fontSize={20}
                fontWeight="semibold"
                {...textProps.primaryColor}
              >
                Now Playing
              </Text>
              <Text
                fontSize={12}
                fontWeight="medium"
                {...textProps.accentColor}
                onPress={() =>
                  navigate('Category', {
                    category: 'movies',
                    item: { name: 'Now Playing' },
                  })
                }
              >
                View all
              </Text>
            </HStack>
          </VStack>

          {/* Trending Now*/}
          {/* Popular */}
          {/* Upcoming */}
          {/* Top Rated */}
        </VStack>
      </Main>
    </>
  )
}
