import { LucideIcon } from 'lucide-react-native'
import colors from 'native-base/lib/typescript/theme/base/colors'
import { textProps } from '../../styles/props'
import { Pressable, Spinner, Text, useColorMode, useTheme } from 'native-base'

export default ({
  icon: Icon,
  onPress,
  text,
  isLoading = false,
}: {
  icon: LucideIcon
  onPress: () => void
  text: string
  isLoading?: boolean
}) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
    <>
      <Pressable
        borderRadius={10}
        _dark={{ _pressed: { bg: 'brand.700', opacity: 0.5 } }}
        _light={{ _pressed: { bg: 'coolGray.300' } }}
        px={4}
        py={2}
        flex={1}
        alignItems="center"
        onPress={onPress}
      >
        {!isLoading ? (
          <Icon
            size={24}
            color={
              colorMode === 'dark' ? colors.brand[200] : colors.coolGray[800]
            }
          />
        ) : (
          <Spinner
            size={24}
            color={
              colorMode === 'dark' ? colors.brand[200] : colors.coolGray[800]
            }
          />
        )}
        <Text
          mt={1}
          fontSize={12}
          fontWeight="medium"
          {...textProps.primaryColor}
        >
          {text}
        </Text>
      </Pressable>
    </>
  )
}
