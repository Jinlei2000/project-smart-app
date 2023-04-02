import React from 'react'
import { FlatList, Flex, Pressable, Skeleton, Text, VStack } from 'native-base'
import { btnProps, textProps } from '../../styles/props'
import { ICategory } from '../../interfaces/ICategory'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.toString()}
      contentContainerStyle={{
        paddingHorizontal: 24,
      }}
      ItemSeparatorComponent={() => <Flex w={2} />}
      renderItem={({ item }) => (
        <Skeleton borderRadius={12} height={30} width={70} />
      )}
    />
  )
}
