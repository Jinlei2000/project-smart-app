import { Button, Text, View } from 'native-base'
import useAuth from '../../../hooks/useAuth'
import useSessionToken from '../../../hooks/useSessionToken'

export default () => {
  const { getSession } = useSessionToken()
  const { logout } = useAuth()

  const handleBtn = async () => {
    const session = await getSession()
    console.log(session)
  }
  return (
    <View>
      <Button onPress={handleBtn}></Button>
      <Button
        onPress={() => {
          logout()
        }}
      >
        <Text>Logout</Text>
      </Button>
      <Text>Profile</Text>
    </View>
  )
}
