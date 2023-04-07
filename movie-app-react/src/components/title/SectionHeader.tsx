import { HStack, Text } from 'native-base'
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
        <Text
          fontSize={12}
          fontWeight="medium"
          {...textProps.accentColor}
          onPress={() =>
            navigate('ViewAll', {
              category: category,
              item: { name: title },
            })
          }
        >
          View all
        </Text>
      )}
    </HStack>
  )
}
