import { Box, Flex, Pressable, Image, Text, Center } from 'native-base'
import IMovie from '../../interfaces/IMovie'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { textProps } from '../../styles/props'
import RatingBadge from '../badge/RatingBadge'
import PlaceholderImage from '../placeholder/PlaceholderImage'

export default ({ movie }: { movie: IMovie }) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  

  return (
    <Pressable
      onPress={() =>
        navigate('Detail', {
          movie: movie,
        })
      }
    >
      <Flex
        _dark={{
          bg: 'brand.600',
        }}
        _light={{
          bg: 'coolGray.300',
        }}
        borderRadius={16.5}
        mr={4}
        justifyContent={'center'}
        alignItems={'center'}
        position="relative"
      >
        {movie.posterUrl ? (
          <Image
            width={120}
            height={180}
            src={movie.posterUrl}
            alt={movie.title}
            resizeMode="cover"
            borderRadius={16}
          />
        ) : (
          <PlaceholderImage
            width={120}
            height={180}
            size={16}
            boxStyle={{
              borderRadius: 16,
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
