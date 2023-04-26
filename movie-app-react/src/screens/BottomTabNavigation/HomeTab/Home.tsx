import { enumMovieCategory } from '../../../enum/enumMovieCategory'
import { ICategory } from '../../../interfaces/ICategory'
import { Box, VStack } from 'native-base'
import CategoryList from '../../../components/list/CategoryList'
import IMovie from '../../../interfaces/IMovie'
import Main from '../../../components/generic/Main'
import MovieList from '../../../components/list/MovieList'
import NavHeader from '../../../components/header/NavHeader'
import React, { useEffect, useState } from 'react'
import useApi from '../../../hooks/useApi'

export default () => {
  const { getCategories, getMovies } = useApi()
  const [categories, setCategories] = useState<ICategory[] | null>(null)
  const [movies, setMovies] = useState<{ [key: string]: IMovie[] | null }>({
    nowPlaying: null,
    popular: null,
    topRated: null,
    trending: null,
    upcoming: null,
  })

  useEffect(() => {
    // Get categories
    getCategories().then((data: ICategory[]) => {
      setCategories(data)
    })

    // Get movies
    getMovies(enumMovieCategory.NOW_PLAYING, 1).then(
      (data: IMovie[] | null) => {
        setMovies(prev => ({
          ...prev,
          nowPlaying: data,
        }))
      },
    )

    getMovies(enumMovieCategory.POPULAR, 1).then((data: IMovie[] | null) => {
      setMovies(prev => ({
        ...prev,
        popular: data,
      }))
    })

    getMovies(enumMovieCategory.TOP_RATED, 1).then((data: IMovie[] | null) => {
      setMovies(prev => ({
        ...prev,
        topRated: data,
      }))
    })

    getMovies(enumMovieCategory.UPCOMING, 1).then((data: IMovie[] | null) => {
      setMovies(prev => ({
        ...prev,
        upcoming: data,
      }))
    })

    getMovies(enumMovieCategory.TRENDING_NOW, 1).then(
      (data: IMovie[] | null) => {
        setMovies(prev => ({
          ...prev,
          trending: data,
        }))
      },
    )
  }, [])

  return (
    <>
      <Main>
        <Box mt={12} mb={20}>
          <VStack space={6} mt={2}>
            {/* Categories */}
            <CategoryList categories={categories} header={true} />
            {/* Now Playing */}
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
        </Box>
      </Main>
      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Name&Text',
          right: 'Search&Profile',
        }}
      />
    </>
  )
}
