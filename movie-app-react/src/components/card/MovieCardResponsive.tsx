import { Box, Flex, Pressable, Image, Text } from 'native-base'
import IMovie from '../../interfaces/IMovie'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { textProps } from '../../styles/props'
import RatingBadge from '../badge/RatingBadge'
import PlaceholderImage from '../placeholder/PlaceholderImage'
import { Dimensions } from 'react-native'

const ITEM_WIDTH = (Dimensions.get('window').width - 64) / 2
const ITEM_HEIGHT = ITEM_WIDTH * 1.5
const BORDER_RADIUS = ITEM_WIDTH * 0.11

export default ({
  movie,
  navigateToSameScreen = false,
}: {
  movie: IMovie
  navigateToSameScreen?: boolean
}) => {
  const { navigate, push } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <Pressable
      key={movie.id}
      onPress={() => {
        if (navigateToSameScreen) {
          push('Detail', {
            movie: movie,
          })
        } else {
          navigate('Detail', {
            movie: movie,
          })
        }
      }}
    >
      <Flex
        _dark={{
          bg: 'brand.600',
        }}
        _light={{
          bg: 'coolGray.300',
        }}
        borderRadius={BORDER_RADIUS + 0.5}
        justifyContent={'center'}
        alignItems={'center'}
        position="relative"
      >
        {movie.posterUrl ? (
          <Image
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            src={movie.posterUrl}
            alt={movie.title}
            resizeMode="cover"
            borderRadius={BORDER_RADIUS}
          />
        ) : (
          <PlaceholderImage
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            size={24}
            boxStyle={{
              borderRadius: BORDER_RADIUS,
            }}
          />
        )}
        <RatingBadge rating={movie.rating} />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          opacity={0.95}
          _dark={{
            bg: 'brand.800',
          }}
          _light={{
            bg: 'coolGray.100',
          }}
          m={1.5}
          borderRadius={14}
          height={10}
          justifyContent={'center'}
          alignItems={'center'}
          px={1.5}
        >
          <Text
            {...textProps.primaryColor}
            fontWeight={'medium'}
            fontSize={10}
            numberOfLines={2}
            textAlign="center"
          >
            {movie.title}
          </Text>
        </Box>
      </Flex>
    </Pressable>
  )
}
