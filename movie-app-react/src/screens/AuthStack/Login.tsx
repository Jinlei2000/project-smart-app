import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  Link,
  Stack,
  Text,
  useSafeArea,
  VStack,
} from 'native-base'
import React from 'react'
import { Keyboard, Platform } from 'react-native'
import Logo from '../../components/generic/Logo'
import useAuth from '../../hooks/useAuth'
import useForm from '../../hooks/useForm'
import useToast from '../../hooks/useToast'
import { bgProps, formProps, textProps } from '../../styles/props'

export default () => {
  const { handleChange, errors, values, validateAll } = useForm()
  const { login } = useAuth()
  const { showToast } = useToast()

  const safeAreaProps = useSafeArea({
    safeArea: true,
    px: 6,
    py: 2,
  })

  const handleSubmit = () => {
    // dismiss keyboard
    Keyboard.dismiss()

    const isValid = validateAll()
    if (!isValid) {
      console.log('invalid form')
    } else {
      login(values.username, values.password).then(result => {
        if (!result.success) {
          // console.log(`login failed: ${result.error}`)
          showToast({
            title: result.error,
            status: 'error',
          })
        }
      })
    }
  }

  return (
    <KeyboardAvoidingView
      {...bgProps}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <VStack w="full" h="full" {...safeAreaProps} alignItems="center">
        <Logo />
        <Box justifyContent="center" alignContent="center" w="full">
          <Heading {...textProps.header} mb={6}>
            Login
          </Heading>
          <VStack space={4}>
            <FormControl isRequired isInvalid={errors.username}>
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
            <FormControl isRequired isInvalid={errors.password}>
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
                type="text"
                id="password"
                placeholder="CHdfzd51sd?5"
                onChange={event => {
                  handleChange(event, 'password')
                }}
              />
              <Link {...formProps.link} alignSelf="flex-end" mt="1" isExternal>
                Forget Password?
              </Link>
            </FormControl>
            <Button
              mt="2"
              borderRadius={16}
              h={12}
              _text={{ fontSize: 16, fontWeight: 600 }}
              colorScheme="indigo"
              onPress={handleSubmit}
            >
              Sign in
            </Button>
            <HStack justifyContent="center">
              <Text {...formProps.text}>Don't have an account? </Text>
              <Link {...formProps.link} isExternal href="#">
                Register
              </Link>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  )
}
