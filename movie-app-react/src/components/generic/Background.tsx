import { ScrollView, useSafeArea, View } from 'native-base'
import { bgProps } from '../../styles/props'

export default ({ children }: JSX.ElementChildrenAttribute) => {
  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  })

  return (
    <View {...bgProps} {...safeAreaProps} flex={1}>
      <ScrollView px={6} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  )
}
