import { Text, VStack } from 'native-base'
import Main from '../../../components/generic/Main'
import NavHeader from '../../../components/header/NavHeader'

export default () => {
  return (
    <>
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: 'Rating',
        }}
      />
      <Main>
        <VStack mt={2}>
          <Text>Rating</Text>
        </VStack>
      </Main>
    </>
  )
}
