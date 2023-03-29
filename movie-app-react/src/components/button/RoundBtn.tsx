import { Pressable, useColorMode, useTheme } from 'native-base'

export default ({ icon: Icon, handleBtn }: { icon: any; handleBtn: any }) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
    <Pressable
      p={2}
      size={10}
      _dark={{ bg: 'brand.700', _pressed: { 
        opacity: 0.5,
       } }}
      _light={{ bg: 'coolGray.200', _pressed: { 
       bg: 'coolGray.300',
      } }}
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
