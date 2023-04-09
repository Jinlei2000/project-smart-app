import { FlatList, Flex, VStack } from 'native-base'
import React from 'react'
import IMovie from '../../interfaces/IMovie'
import MovieCard from '../card/MovieCard'
import SectionHeader from '../title/SectionHeader'
import SkeletonMovieList from '../skeleton/SkeletonMovieList'

export default ({
  title,
  data,
  navigateToSameScreen = false,
  viewAll,
  mb,
}: {
  title: string
  data: IMovie[] | null
  navigateToSameScreen?: boolean
  viewAll?: boolean
  mb?: number
}) => {
  if (data && data.length === 0) {
    return null
  }

  return (
    <VStack space={4} mb={mb}>
      <SectionHeader
        title={title}
        category="Movies"
        viewAll={
          viewAll != undefined
            ? viewAll
            : data && data.length > 10
            ? true
            : false
        }
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
