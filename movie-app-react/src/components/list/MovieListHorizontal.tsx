import { Box, FlatList, Flex, Text, VStack } from 'native-base'
import IMovie from '../../interfaces/IMovie'
import { RefreshControl } from 'react-native'
import MovieCardHorizontal from '../card/MovieCardHorizontal'
import SkeletonMovieListHorizontal from '../skeleton/SkeletonMovieListHorizontal'

export default ({
  movies,
  isRefreshing,
  onRefresh,
}: {
  movies: IMovie[] | null
  isRefreshing: boolean
  onRefresh: () => void
}) => {
  return (
    <>
      {movies ? (
        movies.length > 0 ? (
          <FlatList
            data={movies}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id.toString()}
            ItemSeparatorComponent={() => <Flex h={6} />}
            contentContainerStyle={{
              paddingHorizontal: 24,
              marginTop: 56,
              paddingBottom: 142,
            }}
            renderItem={({ item }: { item: IMovie }) => (
              <MovieCardHorizontal movie={item} />
            )}
            refreshControl={
              // add RefreshControl component with onRefresh callback
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Box mt={12} mb={20} mx={6}>
            <VStack mt={2}>
              <Text color="gray.500" fontSize="lg" textAlign="center">
                You don't have any movies in your watchlist
              </Text>
            </VStack>
          </Box>
        )
      ) : (
        <SkeletonMovieListHorizontal />
      )}
    </>
  )
}
