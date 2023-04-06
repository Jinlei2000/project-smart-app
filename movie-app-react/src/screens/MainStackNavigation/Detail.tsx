import { Box, Flex, Image, Text, View } from 'native-base'
import Main from '../../components/generic/Main'
import IMovie from '../../interfaces/IMovie'
import { Dimensions, StatusBar } from 'react-native'
import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import { LinearGradient } from 'expo-linear-gradient'

export default (props: any) => {
  const {} = useApi()
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

  useEffect(() => {}, [])

  return (
    <Main safeArea={false}>
      <StatusBar hidden />
      <Flex position={'relative'}>
        <Image
          source={{ uri: movie.posterUrl }}
          alt={movie.title}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').width * 1.5}
        />

        {/* little liniar gradient */}
        <Box
          // zIndex={20}
          // position={'absolute'}
          // bottom={0}
          // left={0}
          height={Dimensions.get('window').width * 1.5 * 0.3}
          width={'full'}
          // bottom #201E26 100% - top #201E26 0%
          // bg={{
          //   linearGradient: {
          //     colors: ['#201E26 0%', '#201E26 100%'],
          //     start: [0, 0],
          //     end: [0, 1],
          //   },
          // }}
          bgColor={{
            linearGradient: {
              colors: ['#FF0000', '#0000FF'],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          // bgColor={'red.500'}
        />
      </Flex>

      <Flex></Flex>
    </Main>
  )
}
