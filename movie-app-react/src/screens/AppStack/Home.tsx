import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button, Center, Text, View } from 'native-base'
import useColorMode from '../../hooks/useColorMode'

export default () => {
  // const { colorMode, setColorMode } = useColorMode()
  const { setMode, getMode } = useColorMode()

  const { navigate, setOptions, goBack, getParent } =
    useNavigation<StackNavigationProp<ParamListBase, 'Appstack'>>()

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
          The active color mode is:
          <Text bold fontSize="lg">
            {getMode()}
          </Text>
        </Text>
        <Button
          mt="8"
          onPress={() => {
            setMode('system')
          }}
        >
          default
        </Button>
        <Button
          mt="8"
          onPress={() => {
            setMode('light')
          }}
        >
          light
        </Button>
        <Button
          mt="8"
          onPress={() => {
            setMode('dark')
          }}
        >
          dark
        </Button>
        <Button
          mt="16"
          onPress={() => {
            console.log('go to test')
            navigate('Test')
          }}
        >
          Go to test
        </Button>
      </Center>
    </View>
  )
}
