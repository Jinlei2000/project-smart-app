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
      bg={'coolGray.900'}
      top={0}
      left={0}
      right={0}
      zIndex={100}
    >
      <Box {...safeAreaProps} px={6}>
        <Text>Hi, Bert</Text>
        <Text>Let's explore some movies</Text>
        <HStack space={2}>
          <Pressable
            _pressed={{ bg: 'coolGray.400' }}
            p={2}
            size={10}
            bg="coolGray.500"
            onPress={handleSearch}
            rounded="full"
          >
            <Search color="white" size={24} />
          </Pressable>
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
      </Box>
    </View>
  )
}
