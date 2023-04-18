import { Eye, EyeOff } from 'lucide-react-native'
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Icon,
  Input,
  KeyboardAvoidingView,
  Link,
  Pressable,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useSafeArea,
  useTheme,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import Logo from '../../components/generic/Logo'
import useAuth from '../../hooks/useAuth'
import useForm from '../../hooks/useForm'
import useToast from '../../hooks/useToast'
import { bgProps, buttonProps, formProps } from '../../styles/props'

export default () => {
  const { handleChange, errors, values, validateAll } = useForm()
  const { colors } = useTheme()
  const { colorMode } = useColorMode()
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const [btnInfo, setBtnInfo] = useState<{
    state: React.ReactNode
    disabled: boolean
  }>({
    state: 'Login',
    disabled: false,
  })

  const safeAreaProps = useSafeArea({
    safeArea: true,
    px: 6,
    py: 2,
  })

  const resetButton = () => {
    setBtnInfo({ state: 'Login', disabled: false })
  }

  const handleSubmit = async (): Promise<void> => {
    // set button state to spinner and disable button
    setBtnInfo({ state: <Spinner color="white" />, disabled: true })
    Keyboard.dismiss()

    const isValid = validateAll()

    if (!isValid) {
      resetButton()
      // console.log('invalid form')
      return
    }

    try {
      const result = await login(values.username, values.password)
      if (!result.success) {
        showToast({ title: result.error, status: 'error' })
      } else {
        // if login success it will automatically go to home screen
      }
    } catch (error) {
      // console.log(error)
    } finally {
      resetButton()
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <KeyboardAvoidingView
      {...bgProps}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Center w="full" h="full" {...safeAreaProps}>
        <Logo />
        <Box justifyContent="center" alignContent="center" w="full">
          <VStack space={4}>
            <FormControl isInvalid={errors.username}>
              <Stack direction="row" justifyContent="space-between">
                <FormControl.Label htmlFor="username" {...formProps.label}>
                  Username
                </FormControl.Label>
                <FormControl.ErrorMessage {...formProps.error}>
                  {errors.usernameError}
                </FormControl.ErrorMessage>
              </Stack>
              <Input
                {...formProps.input}
                type="text"
                id="username"
                placeholder="John Doe"
                onChange={event => {
                  handleChange(event, 'username')
                }}
              />
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Stack direction="row" justifyContent="space-between">
                <FormControl.Label htmlFor="password" {...formProps.label}>
                  Password
                </FormControl.Label>
                <FormControl.ErrorMessage {...formProps.error}>
                  {errors.passwordError}
                </FormControl.ErrorMessage>
              </Stack>
              <Input
                {...formProps.input}
                // type="password"
                enablesReturnKeyAutomatically={true}
                returnKeyType="done"
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="CHdfzd51sd?5"
                // secureTextEntry={!showPassword}
                value={values.password}
                onChange={event => {
                  handleChange(event, 'password')
                }}
                InputRightElement={
                  <Pressable onPress={togglePassword} mx={4}>
                    {showPassword ? (
                      <EyeOff
                        size={24}
                        color={
                          colorMode === 'dark'
                            ? colors.coolGray[400]
                            : colors.brand[600]
                        }
                      />
                    ) : (
                      <Eye
                        size={24}
                        color={
                          colorMode === 'dark'
                            ? colors.coolGray[400]
                            : colors.brand[600]
                        }
                      />
                    )}
                  </Pressable>
                }
              />

              <Link
                {...formProps.link}
                alignSelf="flex-end"
                mt="1"
                href="https://www.themoviedb.org/reset-password"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button
              {...buttonProps}
              onPress={handleSubmit}
              disabled={btnInfo.disabled}
            >
              {btnInfo.state}
            </Button>
            <HStack justifyContent="center">
              <Text {...formProps.text}>Don't have an account? </Text>
              <Link
                {...formProps.link}
                href="https://www.themoviedb.org/signup"
              >
                Register
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  )
}
