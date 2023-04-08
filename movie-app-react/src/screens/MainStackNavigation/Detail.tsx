import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  View,
  useColorMode,
  useSafeArea,
  useTheme,
} from 'native-base'
import IMovie from '../../interfaces/IMovie'
import { Dimensions, Share, RefreshControl } from 'react-native'
import { useCallback, useState } from 'react'
import useApi from '../../hooks/useApi'
import { bgProps, btnProps, textProps } from '../../styles/props'
import RatingBadge from '../../components/badge/RatingBadge'
import {
  Bookmark,
  BookmarkMinus,
  ChevronLeft,
  Clock3,
  Heart,
  HeartOff,
  ShareIcon,
  Star,
} from 'lucide-react-native'
import IMovieDetail from '../../interfaces/IMovieDetail'
import CategoryList from '../../components/list/CategoryList'
import ActionBtn from '../../components/button/ActionBtn'
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NotificationFeedbackType, notificationAsync } from 'expo-haptics'
import { vibrationModeAtom } from '../../stores/vibrationMode'
import { useAtom } from 'jotai'
import RoundBtn from '../../components/button/RoundBtn'
import CastListPreview from '../../components/list/CastListPreview'
import VideoList from '../../components/list/VideoList'
import PlaceholderImage from '../../components/placeholder/PlaceholderImage'

export default (props: any) => {
  const { getMovieById, deleteOrAddFavorite, deleteOrAddWatchlist } = useApi()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()
  const { navigate, goBack } =
    useNavigation<StackNavigationProp<ParamListBase>>()
  const [vibrationMode] = useAtom(vibrationModeAtom)
  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  })
  const [readMoreData, setReadMoreData] = useState({
    show: false,
    text: 'Read more',
    lines: 3,
  })
  const [favoriteData, setFavoriteData] = useState({
    isLoading: true,
    isFavorite: false,
  })
  const [watchlistData, setWatchlistData] = useState({
    isLoading: true,
    isWatchlist: false,
  })

  // console.log(props)

  // const movie: IMovie = props.route.params.movie
  // console.log(movie)

  // TEMPORARY TEST
  const movie = {
    id: 502356,
    overview:
      'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.',
    posterUrl:
      'https://image.tmdb.org/t/p/w780/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
    rating: 78,
    releaseDate: '2023-04-05',
    title: 'The Super Mario Bros. Movie',
  }
  const [movieDetail, setMovieDetail] = useState<IMovieDetail | null>({
    id: movie.id,
    overview: movie.overview,
    posterUrl: movie.posterUrl,
    rating: movie.rating,
    releaseDate: movie.releaseDate,
    title: movie.title,
  })
  const [isRefreshing, setIsRefreshing] = useState(false) // add state for isRefreshing

  const onRefresh = () => {
    // don't refresh if there is no data
    movieDetail?.genres ? setIsRefreshing(true) : setIsRefreshing(false)
    getMovieById(movie.id).then((data: IMovieDetail | null) => {
      setIsRefreshing(false)
      setMovieDetail(data)
      // set favorite data
      setFavoriteData({
        isLoading: false,
        isFavorite: data!.accountStates!.favorite,
      })
      // set watchlist data
      setWatchlistData({
        isLoading: false,
        isWatchlist: data!.accountStates!.watchlist,
      })
    })
  }

  // refresh every time the screen is focused
  // need it when user comes back from RateMovie screen (after rating the movie or deleting the rating)
  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, []),
  )

  return (
    <View {...bgProps} flex={1}>
      <ScrollView
        bounces={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          // add RefreshControl component with onRefresh callback
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* image with gradient over it */}
        <Flex position={'relative'}>
          {/* poster image */}
          {movieDetail?.posterUrl ? (
            <Image
              source={{ uri: movieDetail.posterUrl }}
              alt={movieDetail.title}
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').width * 1.5}
            />
          ) : (
            // show placeholder image if there is no posterUrl
            <PlaceholderImage
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').width * 1.5}
              size={Dimensions.get('window').width * 0.5}
            />
          )}

          {/* little liniar gradient over the image */}
          <Box
            zIndex={20}
            position={'absolute'}
            bottom={0}
            left={0}
            height={Dimensions.get('window').width * 1.5 * 0.3}
            width={'full'}
            bgColor={{
              linearGradient: {
                colors:
                  colorMode === 'dark'
                    ? ['#201E26', 'transparent']
                    : ['#f3f4f6', 'transparent'],
                start: [0, 1],
                end: [0, 0],
              },
            }}
          />
        </Flex>

        {/* content */}
        <VStack mt={-10} mb={10} bg={'transparent'}>
          {/* rating, release year, runtime */}
          <HStack
            mx={6}
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <HStack space={2}>
              <RatingBadge
                rating={movieDetail?.rating}
                size="md"
                styleProps={{ m: 0, position: 'relative' }}
              />
              <Box {...btnProps} borderRadius={10} px={2} py={1}>
                <Text
                  fontSize={12}
                  fontWeight="semibold"
                  {...textProps.primaryColor}
                >
                  {movieDetail?.releaseDate.split('-')[0]}
                </Text>
              </Box>
            </HStack>

            {movieDetail?.runtime ? (
              <HStack space={1} alignItems="center">
                <Clock3
                  strokeWidth={2.5}
                  size={15}
                  color={
                    colorMode === 'dark'
                      ? colors.brand[200]
                      : colors.coolGray[800]
                  }
                />
                <Text
                  fontSize={12}
                  fontWeight="semibold"
                  {...textProps.primaryColor}
                >
                  {Math.floor(movieDetail?.runtime / 60)}h{' '}
                  {movieDetail?.runtime % 60}m
                </Text>
              </HStack>
            ) : (
              <Skeleton.Text lines={1} width={50} />
            )}
          </HStack>

          {/* title */}
          <Text
            mx={6}
            fontSize={24}
            lineHeight={30}
            fontWeight="semibold"
            {...textProps.primaryColor}
            mb={2}
          >
            {movieDetail?.title}
          </Text>

          {/* categories */}
          <CategoryList
            categories={movieDetail?.genres}
            header={false}
            styleProps={{ mb: 4 }}
          />

          {/* overview */}
          <Box mx={6} mb={4}>
            {movieDetail?.overview ? (
              <>
                <Pressable
                  onPress={() => {
                    if (readMoreData.lines === 0) {
                      setReadMoreData({
                        show: !readMoreData.show,
                        text: readMoreData.show ? 'Read more' : 'Read less',
                        lines: readMoreData.show ? 3 : 0,
                      })
                    }
                  }}
                >
                  <Text
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="normal"
                    {...textProps.primaryColor}
                    numberOfLines={
                      movieDetail!.overview.length > 150
                        ? readMoreData.lines
                        : 0
                    }
                  >
                    {movieDetail?.overview}
                  </Text>
                </Pressable>

                {/* read more button */}
                {movieDetail!.overview.length > 150 && (
                  <Pressable
                    alignSelf="flex-start"
                    onPress={() => {
                      setReadMoreData({
                        show: !readMoreData.show,
                        text: readMoreData.show ? 'Read more' : 'Read less',
                        lines: readMoreData.show ? 3 : 0,
                      })
                    }}
                  >
                    <Text
                      fontSize={14}
                      fontWeight="medium"
                      {...textProps.accentColor}
                    >
                      {readMoreData.text}
                    </Text>
                  </Pressable>
                )}
              </>
            ) : (
              <Text
                fontSize={14}
                fontWeight="medium"
                {...textProps.primaryColor}
              >
                No overview available
              </Text>
            )}
          </Box>

          {/* favorite, rate, share buttons */}
          <HStack mx={10} mb={2} alignItems="center">
            {/* favorite button */}

            <ActionBtn
              icon={favoriteData.isFavorite ? HeartOff : Heart}
              text="Favorite"
              isLoading={favoriteData.isLoading}
              onPress={() => {
                setFavoriteData({
                  ...favoriteData,
                  isLoading: true,
                })
                deleteOrAddFavorite(
                  movieDetail!.id,
                  !favoriteData.isFavorite,
                ).then(() => {
                  if (vibrationMode) {
                    // if vibrationMode is true, add haptic feedback
                    notificationAsync(NotificationFeedbackType.Success)
                  }
                  setFavoriteData({
                    isFavorite: !favoriteData.isFavorite,
                    isLoading: false,
                  })
                })
              }}
            />

            {/* rate button */}
            <ActionBtn
              icon={Star}
              text="Rate it"
              onPress={() => {
                navigate('RateMovie', {
                  movie: {
                    id: movieDetail?.id,
                    title: movieDetail?.title,
                    posterUrl: movieDetail?.posterUrl,
                    rated: movieDetail?.accountStates?.rated,
                  },
                })
              }}
            />

            {/* share button */}
            <ActionBtn
              icon={ShareIcon}
              text="Share"
              onPress={() => {
                Share.share({
                  // show movie title and link to the movie
                  message: `Check out this movie: ${movieDetail?.title} - https://www.themoviedb.org/movie/${movieDetail?.id}`,
                })
              }}
            />
          </HStack>

          {/* cast */}
          <CastListPreview
            casts={movieDetail?.credits?.cast}
            movieId={movieDetail!.id}
          />

          {/* videos */}
          <VideoList videos={movieDetail?.videos} movieId={movieDetail!.id} />
        </VStack>
      </ScrollView>

      {/* Custom navBar */}
      <Box
        position={'absolute'}
        top={0}
        left={0}
        zIndex={1}
        {...safeAreaProps}
        bg={'transparent'}
        w="100%"
      >
        <HStack justifyContent="space-between" px={6} pb={4}>
          <RoundBtn handleBtn={goBack} icon={ChevronLeft} />
          <RoundBtn
            handleBtn={() => {
              setWatchlistData({
                ...watchlistData,
                isLoading: true,
              })
              deleteOrAddWatchlist(
                movieDetail!.id,
                !watchlistData.isWatchlist, // true = add to watchlist, false = delete from watchlist
              ).then(() => {
                if (vibrationMode) {
                  // if vibrationMode is true, add haptic feedback
                  notificationAsync(NotificationFeedbackType.Success)
                }
                setWatchlistData({
                  isWatchlist: !watchlistData.isWatchlist,
                  isLoading: false,
                })
              })
            }}
            icon={watchlistData.isWatchlist ? BookmarkMinus : Bookmark}
            isLoading={watchlistData.isLoading}
          />
        </HStack>
      </Box>
    </View>
  )
}
