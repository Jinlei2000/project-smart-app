import { Text } from 'native-base'
import Main from '../../../components/generic/Main'

export default (props: any) => {

  const { category, item } = props.route.params

  console.log(category, item)
  
  return (
    <Main>
      <Text>Category</Text>
    </Main>
  )
}
