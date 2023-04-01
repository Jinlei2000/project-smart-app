import { Text, VStack } from 'native-base'
import Main from '../../components/generic/Main'
import NavHeader from '../../components/header/NavHeader'

export default (props: any) => {
  const { data } = props.route.params
  console.log(data)

  return (
    <>
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: data.item.name,
        }}
      />
      <Main>
        <VStack mt={2} mx={6}>
          <Text>Rating</Text>
        </VStack>
      </Main>
    </>
  )
}
