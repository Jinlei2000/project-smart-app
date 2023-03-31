import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  FlatList,
  Flex,
  HStack,
  Pressable,
  Text,
  VStack,
  Image,
  Box,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import Main from '../../../components/generic/Main'
import NavHeader from '../../../components/header/NavHeader'
import CategoryList from '../../../components/list/CategoryList'
import { enumMovieCategory } from '../../../enum/enumMovieCategory'
import useApi from '../../../hooks/useApi'
import { ICategory } from '../../../interfaces/ICategory'
import IMovie from '../../../interfaces/IMovie'
import { textProps } from '../../../styles/props'
import MovieCard from '../../../components/card/MovieCard'

export default () => {
  const { getCategories, getMovies } = useApi()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [movies, setMovies] = useState<{ [key: string]: IMovie[] | null }>({})

  const getFirst10Movies = (data: IMovie[] | null) => {
    if (data) {
      return data.slice(0, 10)
    } else {
      return null
    }
  }

  useEffect(() => {
    // Get categories
    getCategories().then((data: ICategory[]) => {
      setCategories(data)
    })

    // Get movies
    getMovies(enumMovieCategory.NOW_PLAYING, 1).then(
      (data: IMovie[] | null) => {
        setMovies((prevState: { [key: string]: IMovie[] | null }) => ({
          ...prevState,
          nowPlaying: getFirst10Movies(data),
        }))
      },
    )

    getMovies(enumMovieCategory.POPULAR, 1).then((data: IMovie[] | null) => {
      setMovies((prevState: { [key: string]: IMovie[] | null }) => ({
        ...prevState,
        popular: getFirst10Movies(data),
      }))
    })

    getMovies(enumMovieCategory.TOP_RATED, 1).then((data: IMovie[] | null) => {
      setMovies((prevState: { [key: string]: IMovie[] | null }) => ({
        ...prevState,
        topRated: getFirst10Movies(data),
      }))
    })

    getMovies(enumMovieCategory.UPCOMING, 1).then((data: IMovie[] | null) => {
      setMovies((prevState: { [key: string]: IMovie[] | null }) => ({
        ...prevState,
        upcoming: getFirst10Movies(data),
      }))
    })

    getMovies(enumMovieCategory.TRENDING_NOW, 1).then(
      (data: IMovie[] | null) => {
        setMovies((prevState: { [key: string]: IMovie[] | null }) => ({
          ...prevState,
          trending: getFirst10Movies(data),
        }))
      },
    )
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
        <VStack space={6} mb={8}>
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
            {/* https://www.npmjs.com/package/react-native-swipeable-view-stack */}
            {/* <FlatList
              horizontal
              pagingEnabled
              data={movies.nowPlaying}
              keyExtractor={item => item?.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              renderItem={({ item }) => (
                <Pressable
                  justifyContent={'center'}
                  onPress={() =>
                    navigate('Detail', {
                      movie: item,
                    })
                  }
                >
                  <Flex
                    width={200}
                    height={300}
                    bg="gray.300"
                    borderRadius={8}
                    mr={4}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text>{item?.title}</Text>
                  </Flex>
                </Pressable>
              )}
            /> */}
          </VStack>

          {/* Trending Now*/}
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
                Trending Now
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
            <FlatList
              horizontal
              data={movies.trending}
              keyExtractor={item => item?.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
              renderItem={({ item }: { item: IMovie }) => (
                <MovieCard movie={item} />
              )}
            />
          </VStack>
          
          {/* Popular */}
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
                Popular
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
            <FlatList
              horizontal
              data={movies.popular}
              keyExtractor={item => item?.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    navigate('Detail', {
                      movie: item,
                    })
                  }
                >
                  <Flex
                    width={100}
                    height={150}
                    bg="gray.300"
                    borderRadius={8}
                    mr={4}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text>{item?.title}</Text>
                  </Flex>
                </Pressable>
              )}
            />
          </VStack>
          {/* Upcoming */}
          {/* Top Rated */}
        </VStack>
      </Main>
    </>
  )
}
