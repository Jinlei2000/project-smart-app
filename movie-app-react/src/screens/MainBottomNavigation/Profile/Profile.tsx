import { Text, VStack } from 'native-base'
import Main from '../../../components/generic/Main'
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
    <Main>
      <VStack mx={6} mb={8}>
        <Text>Profile</Text>
      </VStack>
    </Main>
  )
}
