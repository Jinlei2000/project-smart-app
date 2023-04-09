import { FlatList, Flex, VStack } from 'native-base'
import React from 'react'
import IMovie from '../../interfaces/IMovie'
import MovieCard from '../card/MovieCard'
import SectionHeader from '../title/SectionHeader'
import SkeletonMovieList from '../skeleton/SkeletonMovieList'

export default ({
  title,
  data,
  movieId,
  navigateToSameScreen = false,
}: {
  title: string
  data: IMovie[] | null
  movieId?: number
  navigateToSameScreen?: boolean
}) => {
  return (
    <VStack space={4}>
      <SectionHeader
        title={title}
        category="Movies"
        viewAll={data && data.length > 10 ? true : false}
        id={movieId}
      />
      {data !== null ? (
        <FlatList
          horizontal
          // first 10 items
          data={data.slice(0, 10)}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          ItemSeparatorComponent={() => <Flex w={4} />}
          contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          renderItem={({ item }: { item: IMovie }) => (
            <MovieCard
              key={item.id}
              movie={item}
              navigateToSameScreen={navigateToSameScreen}
            />
          )}
        />
      ) : (
        <SkeletonMovieList />
      )}
    </VStack>
  )
}
