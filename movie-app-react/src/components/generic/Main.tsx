import { ScrollView, useSafeArea, View } from 'native-base'
import { bgProps } from '../../styles/props'

export default ({
  children,
  scroll = true,
  safeAreaBottom = true,
  safeAreaTop = true,
}: {
  children?: JSX.Element | JSX.Element[]
  scroll?: boolean
  safeAreaBottom?: boolean
  safeAreaTop?: boolean
}) => {
  const safeAreaProps = useSafeArea({
    pt: 2,
    safeAreaTop: safeAreaTop ? true : null,
    safeAreaHorizontal: true,
    safeAreaBottom: safeAreaBottom ? true : null,
  })

  return (
    <View {...bgProps} {...safeAreaProps} flex={1}>
      {scroll ? (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View>{children}</View>
      )}
    </View>
  )
}
