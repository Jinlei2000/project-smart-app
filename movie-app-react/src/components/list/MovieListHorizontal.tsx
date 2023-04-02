import {
  Box,
  FlatList,
  Flex,
  ScrollView,
  Text,
  VStack,
  View,
  useColorMode,
  useTheme,
} from 'native-base'
import IMovie from '../../interfaces/IMovie'
import { RefreshControl } from 'react-native'
import MovieCardHorizontal from '../card/MovieCardHorizontal'
import SkeletonMovieListHorizontal from '../skeleton/SkeletonMovieListHorizontal'
import { useEffect, useState } from 'react'
import { Bookmark, BookmarkMinus, Heart, HeartOff, Star } from 'lucide-react-native'
import { textProps } from '../../styles/props'
import EmptyList from './EmptyList'

export default ({
  movies,
  isRefreshing,
  onRefresh,
  handleRemove,
  category,
}: {
  movies: IMovie[] | null
  isRefreshing: boolean
  onRefresh: () => void
  handleRemove?: (id: number) => void
  category: string
}) => {
  const [removeIcon, setRemoveIcon] = useState<any>(null)
  const [emptyScreen, setEmptyScreen] = useState<JSX.Element | null>(null)

  useEffect(() => {
    if (category === 'Watchlist') {
      setRemoveIcon(BookmarkMinus)
      setEmptyScreen(
        <EmptyList
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          icon={Bookmark}
          title="Your Watchlist is empty"
          description="Never miss a movie again. Use your watchlist to track what you want to watch."
        />,
      )
    } else if (category === 'Favorites') {
      setRemoveIcon(HeartOff)
      setEmptyScreen(
        <EmptyList
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          icon={Heart}
          title="Your Favorites is empty"
          description="Never miss a movie again. Use your watchlist to track what you want to watch."
        />,
      )
    } else if (category === 'Rated') {
      setRemoveIcon(null)
      setEmptyScreen(
        <EmptyList
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          icon={Star}
          title="Your Rated is empty"
          description="Never miss a movie again. Use your watchlist to track what you want to watch."
        />,
      )
    }
  }, [movies])

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
              <MovieCardHorizontal
                movie={item}
                handleRemove={() => handleRemove && handleRemove(item.id)}
                removeIcon={removeIcon}
              />
            )}
            refreshControl={
              // add RefreshControl component with onRefresh callback
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View>{emptyScreen}</View>
        )
      ) : (
        <SkeletonMovieListHorizontal />
      )}
    </>
  )
}
