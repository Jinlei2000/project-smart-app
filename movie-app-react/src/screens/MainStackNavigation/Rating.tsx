import { Text, VStack } from 'native-base'
import NavHeader from '../../components/header/NavHeader'
import Main from '../../components/generic/Main'

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
