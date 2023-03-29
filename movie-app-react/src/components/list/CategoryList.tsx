import React from 'react'
import { FlatList, Flex, Pressable, Text } from 'native-base'
import { btnProps, textProps } from '../../styles/props'
import { ICategory } from '../../interfaces/ICategory'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default ({ categories }: { categories: ICategory[] }) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{
        paddingHorizontal: 24,
      }}
      ItemSeparatorComponent={() => <Flex w={2} />}
      renderItem={({ item }) => (
        <Pressable
          {...btnProps}
          borderRadius={12}
          onPress={() =>
            navigate('Category', {
              category: 'category',
              item: item,
            })
          }
        >
          <Text
            fontSize={12}
            fontWeight="medium"
            px={3}
            py={2}
            {...textProps.primaryColor}
          >
            {item.name}
          </Text>
        </Pressable>
      )}
    />
  )
}
