import { LucideIcon } from 'lucide-react-native'
import {
  Box,
  Flex,
  HStack,
  Switch,
  Text,
  useColorMode,
  useTheme,
} from 'native-base'

export default ({
  handleSwitch,
  isChecked,
  icon: Icon,
  text,
}: {
  handleSwitch: (value: boolean) => void
  isChecked: boolean
  icon: LucideIcon
  text: string
}) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
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
      <Switch
        size="md"
        onToggle={handleSwitch}
        isChecked={isChecked}
        _dark={{
          onTrackColor: 'extra.green',
          offTrackColor: 'brand.600',
        }}
        _light={{
          onTrackColor: 'extra.green',
          offTrackColor: 'coolGray.200',
        }}
      />
    </Flex>
  )
}
