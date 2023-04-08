import { HStack, Pressable, Text } from 'native-base'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { textProps } from '../../styles/props'

export default ({
  title,
  category,
  id,
  viewAll = true,
}: {
  title: string
  category?: string
  id?: number
  viewAll?: boolean
}) => {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <HStack justifyContent={'space-between'} alignItems={'flex-end'} px={6}>
      <Text fontSize={20} fontWeight="semibold" {...textProps.primaryColor}>
        {title}
      </Text>
      {viewAll && (
        <Pressable
          onPress={() =>
            navigate('ViewAll', {
              data: {
                category: category,
                item: { name: title },
                id: id,
              },
            })
          }
          pb={1}
          pt={1.5}
        >
          <Text
            fontSize={12}
            fontWeight="medium"
            {...textProps.accentColor}
          >
            View all
          </Text>
        </Pressable>
      )}
    </HStack>
  )
}
