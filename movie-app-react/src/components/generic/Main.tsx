import { ScrollView, useSafeArea, View } from 'native-base'
import { bgProps } from '../../styles/props'

export default ({
  children,
  scroll = true,
  safeArea = true,
}: {
  children?: JSX.Element | JSX.Element[]
  scroll?: boolean
  safeArea?: boolean
}) => {
  const safeAreaProps = useSafeArea({
    safeArea: false,
    pt: 2,
  })

  if (!safeArea) {
    safeAreaProps.pt = 0
    safeAreaProps.safeArea = false
  }

  return (
    <View {...bgProps} {...safeAreaProps} flex={1}>
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <View>{children}</View>
      )}
    </View>
  )
}
