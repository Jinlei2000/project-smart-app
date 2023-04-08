import { Box, Button, Flex, Image, Text, useTheme } from 'native-base'
import NavHeader from '../../components/header/NavHeader'
import Main from '../../components/generic/Main'
import IMovie from '../../interfaces/IMovie'
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { buttonProps, textProps } from '../../styles/props'
import useApi from '../../hooks/useApi'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Star, StarHalf } from 'lucide-react-native'
import StarRating from 'react-native-star-rating-widget'

const ITEM_SIZE = Dimensions.get('window').height * 0.3

export default (props: any) => {
  const { postMovieRating, deleteMovieRating } = useApi()
  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { colors } = useTheme()
  const [rating, setRating] = useState(0)

  interface IRated {
    rated: { value: number }
  }
  const movie: IMovie extends IRated ? IMovie : IMovie & IRated =
    props.route.params.movie

  // console.log('movie', movie)

  useEffect(() => {
    if (movie.rated) {
      const value = movie.rated.value / 2
      setRating(value)
    } else {
      setRating(0)
    }
  }, [])

  const handleRateMovie = () => {
    const value = rating * 2
    postMovieRating(movie.id, value).then(() => {
      goBack()
    })
  }

  const handleRemoveRating = () => {
    deleteMovieRating(movie.id).then(() => {
      goBack()
    })
  }

  const showStar = ({ size, color, type }: any): JSX.Element => {
    let star = <></>

    if (type === 'full') {
      star = <Star size={size} color={color} />
    } else if (type === 'empty') {
      star = <Star size={size} color={color} />
    } else if (type === 'half') {
      star = (
        <>
          <Box position="relative" size={10}>
            <StarHalf
              size={size}
              color={color}
              style={{ position: 'absolute', zIndex: 10, left: 0, top: 0 }}
            />
            <Star
              size={size}
              color={colors.coolGray[400]}
              style={{ zIndex: 1, position: 'absolute', left: 0, top: 0 }}
            />
          </Box>
        </>
      )
    }
    return star
  }

  return (
    <>
      <Main>
        <Box mx={6} mt={10} justifyContent={'center'} height={'100%'}>
          {/* image */}
          <Flex
            alignSelf="center"
            _dark={{
              bg: 'brand.600',
            }}
            _light={{
              bg: 'coolGray.300',
            }}
            borderRadius={16.5}
            justifyContent={'center'}
            alignItems={'center'}
            position="relative"
            width={ITEM_SIZE}
            height={ITEM_SIZE * 1.5}
          >
            <Image
              width={ITEM_SIZE}
              height={ITEM_SIZE * 1.5}
              src={movie?.posterUrl}
              alt={movie?.title}
              resizeMode="cover"
              borderRadius={16}
            />
          </Flex>

          {/* title */}
          <Text
            alignSelf="center"
            maxW={ITEM_SIZE * 1.2}
            pt={6}
            {...textProps.primaryColor}
            fontWeight={'semibold'}
            fontSize={20}
            lineHeight={24}
            numberOfLines={2}
            textAlign="center"
          >
            {movie?.title}
          </Text>

          {/* rating stars */}
          <Box mt={8} alignSelf={'center'}>
            <StarRating
              StarIconComponent={showStar}
              starSize={40}
              emptyColor={colors.coolGray[400]}
              rating={rating}
              onChange={setRating}
            />
          </Box>

          {/* rate button */}
          <Button {...buttonProps} mt={8} onPress={handleRateMovie}>
            Rate Movie
          </Button>

          {/* delete rating button */}
          <Button
            borderRadius={16}
            mb={6}
            mt={2}
            _dark={{
              _text: {
                color: 'brand.600',
              },
              _pressed: {
                bg: 'brand.700',
              },
            }}
            _light={{
              _text: {
                color: 'coolGray.500',
              },
              _pressed: {
                bg: 'coolGray.200',
              },
            }}
            bg={'transparent'}
            _text={{
              fontSize: 16,
              fontWeight: 'semibold',
            }}
            onPress={handleRemoveRating}
          >
            Delete Rating
          </Button>
        </Box>
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: 'Rate movie',
        }}
      />
    </>
  )
}
