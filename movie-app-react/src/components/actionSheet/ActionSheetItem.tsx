import { LucideIcon } from 'lucide-react-native'
import { Actionsheet, Box, Text, useColorMode, useTheme } from 'native-base'

export default ({
  icon: Icon,
  text,
  onPress,
}: {
  icon: LucideIcon
  text: string
  onPress: () => void
}) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()
  const iconColor =
    colorMode === 'dark' ? colors.brand[200] : colors.coolGray[700]

  return (
    <Actionsheet.Item
      bg={'transparent'}
      _dark={{
        _pressed: { bg: 'brand.700' },
      }}
      _light={{
        _pressed: { bg: 'coolGray.200' },
      }}
      rounded={16}
      startIcon={<Icon size={24} color={iconColor} />}
      onPress={onPress}
    >
      <Box justifyContent={'center'} flex={1}>
        <Text fontWeight={'medium'} alignSelf={'center'}>
          {text}
        </Text>
      </Box>
    </Actionsheet.Item>
  )
}
