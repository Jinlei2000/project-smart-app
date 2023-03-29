import { Text, View } from 'native-base'
import React from 'react'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'

export default () => {
  const {} = useApi()

  return (
    <Main>
      <View>
        <Text>Watchlist</Text>
      </View>
    </Main>
  )
}
