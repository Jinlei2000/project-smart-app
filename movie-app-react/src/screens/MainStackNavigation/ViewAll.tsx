import { Text, VStack } from 'native-base'
import Main from '../../components/generic/Main'
import NavHeader from '../../components/header/NavHeader'

export default (props: any) => {
  // console.log(props)
  const { data } = props.route.params
  console.log("data: ", data)

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
          <Text>viewall</Text>
        </VStack>
      </Main>
    </>
  )
}
