import { Pressable, useColorMode, useTheme } from 'native-base'
import { btnProps } from '../../styles/props';
import { LucideIcon } from 'lucide-react-native';

export default ({
  icon: Icon,
  handleBtn,
}: {
  icon: LucideIcon
  handleBtn: any
}) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
    <Pressable
      p={2}
      size={10}
      {...btnProps}
      onPress={handleBtn}
      rounded="full"
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Icon
        // @ts-ignore
        color={colorMode === 'dark' ? colors.brand[200] : colors.coolGray[700]}
        size={24}
      />
    </Pressable>
  )
}
