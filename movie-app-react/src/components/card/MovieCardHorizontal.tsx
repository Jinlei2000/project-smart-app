import { BookmarkMinus } from 'lucide-react-native'
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
import colors from 'native-base/lib/typescript/theme/base/colors'
import { textProps } from '../../styles/props'
import RatingBadge from '../badge/RatingBadge'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import IMovie from '../../interfaces/IMovie'

export default (watchlist: IMovie) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
    <Flex position="relative" height={145} justify="flex-end" mt={3}>
      <Pressable
        onPress={() =>
          navigate('Detail', {
            movie: watchlist,
          })
        }
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
          src={watchlist?.posterUrl}
          alt={watchlist?.title}
          resizeMode="cover"
          borderRadius={12}
        />
        <RatingBadge rating={watchlist?.rating} />
      </Pressable>

      <Pressable
        onPress={() =>
          navigate('Detail', {
            movie: watchlist,
          })
        }
        _dark={{
          bg: 'brand.800',
        }}
        _light={{
          bg: 'coolGray.200',
        }}
        height={100}
        borderRadius={22}
        alignItems="center"
        flexDirection={'row'}
        pl={3}
        position="relative"
      >
        <Box width={24} height={'full'} />
        <VStack space={2} pl={3} flexBasis={0} flexGrow={1}>
          <Text
            numberOfLines={2}
            fontWeight="semibold"
            fontSize={14}
            lineHeight={17}
            {...textProps.primaryColor}
          >
            {watchlist?.title}
          </Text>
          <Text
            numberOfLines={1}
            fontSize={12}
            fontWeight="regular"
            lineHeight={15}
            {...textProps.secondaryColor}
          >
            {watchlist?.releaseDate}
          </Text>
        </VStack>

        <Pressable
          alignSelf="flex-start"
          mr={2.5}
          mt={2.5}
          onPress={() => {
            console.log('remove from watchlist')
          }}
        >
          <BookmarkMinus
            size={24}
            color={
              colorMode === 'dark'
                ? // @ts-ignore
                  colors.brand[200]
                : colors.coolGray[700]
            }
          />
        </Pressable>
      </Pressable>
    </Flex>
  )
}
