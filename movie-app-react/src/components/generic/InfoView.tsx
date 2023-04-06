import { LucideIcon } from 'lucide-react-native'
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base'
import { textProps, buttonProps } from '../../styles/props'
import Main from './Main'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export default ({
  icon: Icon,
  title,
  description,
  hasButton = true,
  buttonText = 'Go Back',
}: {
  icon: LucideIcon
  title: string
  description: string
  hasButton?: boolean
  buttonText?: string
}) => {
  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
    <>
      <Main scroll={false}>
        <Box mx={6}>
          <Flex
            justifyContent={'center'}
            h={'100%'}
            w={'100%'}
            alignItems={'center'}
          >
            <VStack alignItems="center">
              <Icon
                size={128}
                color={
                  colorMode === 'dark'
                    ? colors.brand[200]
                    : colors.coolGray[300]
                }
                style={{ marginBottom: 24 }}
              />
              <Text
                {...textProps.primaryColor}
                fontSize={18}
                fontWeight="semibold"
              >
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

            {hasButton && (
              <Button
                {...buttonProps}
                onPress={() => goBack()}
                position="absolute"
                width="100%"
                bottom={20}
              >
                {buttonText}
              </Button>
            )}
          </Flex>
        </Box>
      </Main>
    </>
  )
}
