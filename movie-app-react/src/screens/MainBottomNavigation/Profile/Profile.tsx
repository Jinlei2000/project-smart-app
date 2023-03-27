import { Button, Text, View } from 'native-base'
import Background from '../../../components/generic/Background'
import useApi from '../../../hooks/useApi'
import useAuth from '../../../hooks/useAuth'
import useSessionToken from '../../../hooks/useSessionToken'

export default () => {
  const {} = useApi()
  const { getSession } = useSessionToken()
  const { logout } = useAuth()

  const handleBtn = async () => {
    const session = await getSession()
    console.log(session)
  }
  return (
    <Background>
      <Button onPress={handleBtn}></Button>
      <Button
        onPress={() => {
          logout()
        }}
      >
        <Text>Logout</Text>
      </Button>
      <Text>Profile</Text>
    </Background>
  )
}
