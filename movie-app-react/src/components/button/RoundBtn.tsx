import { Pressable, Spinner, useColorMode, useTheme } from 'native-base'
import { btnProps } from '../../styles/props'
import { LucideIcon } from 'lucide-react-native'

export default ({
  icon: Icon,
  handleBtn,
  size = 'sm',
  isLoading = false,
}: {
  icon: LucideIcon
  handleBtn: () => void
  size?: string
  isLoading?: boolean
}) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  let sizeProps = {
    size: 0,
    sizeIcon: 0,
  }

  if (size === 'sm') {
    sizeProps = {
      size: 10,
      sizeIcon: 24,
    }
  } else if (size === 'md') {
    sizeProps = {
      size: 12,
      sizeIcon: 28,
    }
  }

  return (
    <Pressable
      p={2}
      size={sizeProps.size}
      {...btnProps}
      onPress={handleBtn}
      rounded="full"
      justifyContent={'center'}
      alignItems={'center'}
    >
      {!isLoading ? (
        <Icon
          color={
            colorMode === 'dark' ? colors.brand[200] : colors.coolGray[700]
          }
          size={sizeProps.sizeIcon}
        />
      ) : (
        <Spinner
          size={sizeProps.sizeIcon}
          color={
            colorMode === 'dark' ? colors.brand[200] : colors.coolGray[800]
          }
        />
      )}
    </Pressable>
  )
}
