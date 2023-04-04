import { BookmarkMinus, LucideIcon } from 'lucide-react-native'
import {
  Box,
  Flex,
  Image,
  Pressable,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base'
import { textProps } from '../../styles/props'
import RatingBadge from '../badge/RatingBadge'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import IMovie from '../../interfaces/IMovie'

export default ({
  movie,
  handleRemove,
  removeIcon: RemoveIcon,
}: {
  movie: IMovie
  handleRemove?: () => void
  removeIcon: LucideIcon | null
}) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  const handleNavigateToDetail = () => {
    navigate('Detail', {
      movie: movie,
    })
  }

  return (
    <Flex position="relative" height={145} justify="flex-end" mt={3}>
      {/* Movie poster */}
      <Pressable
        onPress={handleNavigateToDetail}
        mx={3}
        mb={3}
        bg="blueGray.900"
        borderRadius={12.5}
        position="absolute"
        bottom={0}
        width={24}
        zIndex={10}
      >
        <Image
          width={24}
          height={145}
          src={movie?.posterUrl}
          alt={movie?.title}
          resizeMode="cover"
          borderRadius={12}
        />
        <RatingBadge rating={movie?.rating} />
      </Pressable>
      {/* Movie details */}
      <Pressable
        onPress={handleNavigateToDetail}
        _dark={{ bg: 'brand.750' }}
        _light={{ bg: 'coolGray.200' }}
        height={100}
        borderRadius={22}
        alignItems="center"
        flexDirection="row"
        pl={3}
        position="relative"
      >
        {/* Empty space to align with movie poster */}
        <Box width={24} height="full" />
        {/* Movie title and release date */}
        <VStack space={2} pl={3} flexBasis={0} flexGrow={1} pr={3}>
          <Text
            numberOfLines={2}
            fontWeight="semibold"
            fontSize={14}
            lineHeight={17}
            {...textProps.primaryColor}
          >
            {movie?.title}
          </Text>
          <Text
            numberOfLines={1}
            fontSize={12}
            fontWeight="regular"
            lineHeight={15}
            {...textProps.secondaryColor}
          >
            {movie?.releaseDate &&
              new Date(movie?.releaseDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
          </Text>
        </VStack>
        {/* Remove from watchlist button */}
        {RemoveIcon && handleRemove && (
          <Pressable
            alignSelf="flex-start"
            borderRadius="full"
            m={2.5}
            _dark={{ _pressed: { bg: 'brand.600' } }}
            _light={{ _pressed: { bg: 'coolGray.300' } }}
            onPress={handleRemove}
          >
            <RemoveIcon
              size={24}
              color={
                colorMode === 'dark' ? colors.brand[200] : colors.coolGray[700]
              }
            />
          </Pressable>
        )}
      </Pressable>
    </Flex>
  )
}
