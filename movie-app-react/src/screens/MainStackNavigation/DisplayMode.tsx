import { Text } from 'native-base'
import Main from '../../components/generic/Main'
import NavHeader from '../../components/header/NavHeader'

export default () => {
  return (
    <>
      <Main>
        <Text>df</Text>
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: 'Display Mode',
        }}
      />
    </>
  )
}
