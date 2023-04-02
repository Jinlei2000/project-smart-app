import { Bookmark, LucideIcon } from 'lucide-react-native'
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base'
import { RefreshControl } from 'react-native'
import { buttonProps, textProps } from '../../styles/props'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default ({
  isRefreshing,
  onRefresh,
  icon: Icon,
  title,
  description,
}: {
  isRefreshing: boolean
  onRefresh: () => void
  icon: LucideIcon
  title: string
  description: string
}) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()

  return (
    <>
      <ScrollView
        mx={6}
        h="100%"
        showsVerticalScrollIndicator={false}
        refreshControl={
          // add RefreshControl component with onRefresh callback
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        // center the empty screen text with flex
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <VStack alignItems="center">
          <Icon
            size={128}
            color={
              colorMode === 'dark'
                ? // @ts-ignore
                  colors.brand[200]
                : colors.coolGray[300]
            }
            style={{ marginBottom: 24 }}
          />
          <Text {...textProps.primaryColor} fontSize={18} fontWeight="semibold">
            {title}
          </Text>
          <Text
            maxW="70%"
            {...textProps.secondaryColor}
            fontSize={16}
            fontWeight="regular"
            textAlign="center"
          >
            {description}
          </Text>
        </VStack>

        <Button
          {...buttonProps}
          onPress={() => navigate('HomeBottomTabs', { screen: 'HomeTab' })}
          position="absolute"
          width="100%"
          bottom={20}
        >
          Explore movies
        </Button>
      </ScrollView>
    </>
  )
}
