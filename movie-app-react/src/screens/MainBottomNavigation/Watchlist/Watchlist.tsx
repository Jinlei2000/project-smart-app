import { Text, VStack } from 'native-base'
import React from 'react'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'


export default () => {
  const {} = useApi()

  return (
    <Main>
      <VStack mx={6} mb={8}>
        <Text>Watchlist</Text>
      </VStack>
    </Main>
  )
}
