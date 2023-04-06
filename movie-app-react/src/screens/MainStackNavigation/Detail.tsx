import {
  Box,
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
  useTheme,
} from 'native-base'
import IMovie from '../../interfaces/IMovie'
import { Dimensions, StatusBar } from 'react-native'
import { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { bgProps, btnProps, textProps } from '../../styles/props'
import RatingBadge from '../../components/badge/RatingBadge'
import { Clock3 } from 'lucide-react-native'
import IMovieDetail from '../../interfaces/IMovieDetail'
import CategoryList from '../../components/list/CategoryList'

export default (props: any) => {
  const { getMovieById } = useApi()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()
  // const [isReadMore, setIsReadMore] = useState(false)
  const [readMoreData, setReadMoreData] = useState({
    show: false,
    text: 'Read more',
    lines: 3,
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

  useEffect(() => {
    getMovieById(movie.id).then((data: IMovieDetail | null) => {
      setMovieDetail(data)
    })
  }, [])

  return (
    <View {...bgProps} flex={1}>
      <StatusBar hidden />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* image with gradient over it */}
        <Flex position={'relative'}>
          <Image
            source={{ uri: movieDetail?.posterUrl }}
            alt={movieDetail?.title}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').width * 1.5}
          />

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

        {/* rating, release year, runtime */}
        <VStack mt={-10} mb={10} bg={'transparent'}>
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
          <Box mx={6}>
            <Pressable
              onPress={() => {
                if (movieDetail!.overview.length > 150) {
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
                  movieDetail!.overview.length > 150 ? readMoreData.lines : 0
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
          </Box>

          {/* favorite, rate, share buttons */}
        </VStack>
      </ScrollView>
    </View>
  )
}
