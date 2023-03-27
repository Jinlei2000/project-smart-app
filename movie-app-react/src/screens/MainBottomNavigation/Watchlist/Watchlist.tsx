import { Text, View } from 'native-base'
import React from 'react'
import Background from '../../../components/generic/Background'
import useApi from '../../../hooks/useApi'

export default () => {
  const {} = useApi()

  return (
    <Background>
      <View>
        <Text>Watchlist</Text>
      </View>
    </Background>
  )
}
