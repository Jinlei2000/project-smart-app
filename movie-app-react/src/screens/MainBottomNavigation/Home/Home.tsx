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
  Spinner,
  Skeleton,
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
import SectionHeader from '../../../components/title/SectionHeader'
import SkeletonMovieList from '../../../components/skeleton/SkeletonMovieList'
import MovieList from '../../../components/list/MovieList'

export default () => {
  const { getCategories, getMovies } = useApi()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [movies, setMovies] = useState<{ [key: string]: IMovie[] | null }>({
    nowPlaying: null,
    popular: null,
    topRated: null,
    trending: null,
    upcoming: null,
  })

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
        <VStack space={6} mb={8} mt={2}>
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
          {/* swipe effect */}
          {/* https://www.npmjs.com/package/react-native-swipeable-view-stack */}
          <MovieList title="Now Playing" data={movies.nowPlaying} />

          {/* Trending Now*/}
          <MovieList title="Trending Now" data={movies.trending} />

          {/* Popular */}
          <MovieList title="Popular" data={movies.popular} />

          {/* Upcoming */}
          <MovieList title="Upcoming" data={movies.upcoming} />

          {/* Top Rated */}
          <MovieList title="Top Rated" data={movies.topRated} />
        </VStack>
      </Main>
    </>
  )
}
