import { Button, Text, View } from 'native-base'
import { useState } from 'react'
import useSessionToken from '../../../hooks/useSessionToken'

export default () => {
  const { getSession } = useSessionToken()

  const handleBtn = async () => {
    const session = await getSession()
    console.log(session)
  }

  return (
    <View>
      <Button onPress={handleBtn}></Button>
      <Text>test</Text>
    </View>
  )
}
