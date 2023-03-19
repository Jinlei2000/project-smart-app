import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Center, Text, useColorMode, View } from 'native-base'

export default () => {
  const { navigate, setOptions, goBack, getParent } =
    useNavigation<StackNavigationProp<ParamListBase, 'Appstack'>>()

    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <View flex="1">
      <Center
        flex="1"
        p="4"
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'warmGray.50',
        }}
      >
        <Text fontSize="lg" display="flex" mb="20">
          Test
          <Text bold fontSize="lg">
            {colorMode}
          </Text>
        </Text>

        <Button
          mt="16"
          onPress={() => {
            console.log('go to test')
            navigate('Home')
          }}
        >
          Go to test
        </Button>
      </Center>
    </View>
  )
}
