import { Button, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Animated, View } from 'react-native'
import Main from '../../../components/generic/Main'
import NavHeader from '../../../components/header/NavHeader'
import useApi from '../../../hooks/useApi'

export default () => {
  const {} = useApi()

  return (
    <>
      <NavHeader
        navBarOptions={{
          left: 'Name&Text',
          right: 'Search&Profile',
        }}
      />
      <Main>
        
        
      </Main>
    </>
  )
}
