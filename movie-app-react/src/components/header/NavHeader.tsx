import { useNavigation } from '@react-navigation/native'
import { CpuIcon, Search } from 'lucide-react-native'
import {
  View,
  Text,
  VStack,
  Avatar,
  Center,
  Circle,
  HStack,
  Pressable,
  Box,
  useSafeArea,
} from 'native-base'
import { textProps } from '../../styles/props'
import RoundBtn from '../button/RoundBtn'

export default () => {
  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  })
  const { navigate } = useNavigation()

  const handleSearch = () => {
    console.log('search')
  }

  return (
    <View
      position="absolute"
      _dark={{ bg: 'brand.900' }}
      _light={{ bg: 'coolGray.100' }}
      top={0}
      left={0}
      right={0}
      zIndex={100}
    >
      <Box {...safeAreaProps} px={6} h={20} justifyContent="center" py={2}>
        <HStack alignItems="center" justifyContent="space-between">
          <VStack>
            <Text
              fontSize={20}
              fontWeight={'bold'}
              lineHeight={20}
              {...textProps.primaryColor}
            >
              Hi, Bert
            </Text>
            <Text
              fontSize={12}
              fontWeight={'medium'}
              lineHeight={15}
              {...textProps.secondaryColor}
            >
              Let's explore some movies
            </Text>
          </VStack>
          <HStack space={2}>

            <RoundBtn handleBtn={handleSearch} icon={Search} />

            <Avatar
              size={10}
              bg="green.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              AJ
            </Avatar>
          </HStack>
        </HStack>
      </Box>
    </View>
  )
}
