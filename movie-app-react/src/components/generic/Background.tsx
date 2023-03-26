import { useSafeArea, View } from 'native-base'
import { bgProps } from '../../styles/props'

export default ({ children }: JSX.ElementChildrenAttribute) => {
  const safeAreaProps = useSafeArea({
    safeArea: true,
    px: 6,
    py: 2,
  })

  return (
    <View {...bgProps} {...safeAreaProps} flex={1}>
      {children}
    </View>
  )
}
