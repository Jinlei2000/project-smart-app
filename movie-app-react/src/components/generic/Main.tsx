import { ScrollView, useSafeArea, View } from 'native-base'
import { bgProps } from '../../styles/props'

export default ({
  children,
  ...styleProps
}: {
  children?: JSX.Element | JSX.Element[]
  styleProps?: any
}) => {
  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  })

  return (
    <View {...bgProps} {...safeAreaProps} flex={1} {...styleProps} mt={16}>
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  )
}
