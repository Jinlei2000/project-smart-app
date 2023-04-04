import { ChevronRight, LucideIcon } from 'lucide-react-native'
import {
  Box,
  Flex,
  HStack,
  Pressable,
  Text,
  useColorMode,
  useTheme,
} from 'native-base'

export default ({
  handleBtn,
  icon: Icon,
  text,
}: {
  handleBtn: () => void
  icon: LucideIcon
  text: string
}) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
    <Pressable
      onPress={handleBtn}
      borderRadius={16}
      _dark={{ _pressed: { bg: 'brand.700' } }}
      _light={{ _pressed: { bg: 'coolGray.200' } }}
    >
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <HStack space={3} alignItems={'center'}>
          <Box
            _dark={{ bg: 'brand.700' }}
            _light={{ bg: 'coolGray.200' }}
            p={2}
            size={10}
            rounded="full"
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Icon
              color={
                colorMode === 'dark' ? colors.brand[200] : colors.coolGray[700]
              }
              size={24}
            />
          </Box>
          <Text fontSize={16} fontWeight={'medium'}>
            {text}
          </Text>
        </HStack>
        <ChevronRight
          color={
            colorMode === 'dark' ? colors.brand[200] : colors.coolGray[700]
          }
          size={24}
        />
      </Flex>
    </Pressable>
  )
}
