import { FlatList, VStack } from 'native-base'
import React from 'react'
import IMovie from '../../interfaces/IMovie'
import MovieCard from '../card/MovieCard'
import SectionHeader from '../title/SectionHeader'
import SkeletonMovieList from '../skeleton/SkeletonMovieList'

export default ({ title, data }: { title: string; data: IMovie[] | null }) => {
  return (
    <VStack space={4}>
      <SectionHeader title={title} navigateTo="Category" category="Movies" />
      {data !== null ? (
        <FlatList
          horizontal
          data={data}
          keyExtractor={item => item?.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 24, paddingRight: 12 }}
          renderItem={({ item }: { item: IMovie }) => (
            <MovieCard movie={item} />
          )}
        />
      ) : (
        <SkeletonMovieList />
      )}
    </VStack>
  )
}
