import { ScrollView, useSafeArea, View } from 'native-base'
import { bgProps } from '../../styles/props'

export default ({
  children,
  scroll = true,
}: {
  children?: JSX.Element | JSX.Element[]
  scroll?: boolean
}) => {
  const safeAreaProps = useSafeArea({
    safeArea: false,
    pt: 2,
  })

  return (
    <View {...bgProps} {...safeAreaProps} flex={1}>
      {scroll ? (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <View>{children}</View>
      )}
    </View>
  )
}
