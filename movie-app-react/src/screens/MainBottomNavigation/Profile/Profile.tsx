import { Avatar, Box, Button, HStack, Text, View, VStack } from 'native-base'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'
import useAuth from '../../../hooks/useAuth'
import useSessionToken from '../../../hooks/useSessionToken'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'
import { Search } from 'lucide-react-native'
import RoundBtn from '../../../components/button/RoundBtn'
import { textProps } from '../../../styles/props'

export default () => {
  const {} = useApi()
  const { getSession } = useSessionToken()
  const { logout } = useAuth()

  const handleBtn = async () => {
    const session = await getSession()
    console.log(session)
  }
  return (
    <>
      <Main>
        <Button onPress={handleBtn}></Button>
        <Button
          onPress={() => {
            logout()
          }}
        >
          <Text>Logout</Text>
        </Button>
        <Text>Profile</Text>
      </Main>
    </>
  )
}
