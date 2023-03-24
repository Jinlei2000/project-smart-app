import {
  Text,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  KeyboardAvoidingView,
  Stack,
} from 'native-base'
import React from 'react'
import { Keyboard, Platform } from 'react-native'
import useAuth from '../../hooks/useAuth'
import useForm from '../../hooks/useForm'
import useToast from '../../hooks/useToast'

export default () => {
  const { handleChange, errors, values, validateAll } = useForm()
  const { login } = useAuth()
  const { showToast } = useToast()

  const handleSubmit = () => {
    // dismiss keyboard
    Keyboard.dismiss()

    const isValid = validateAll()
    if (!isValid) {
      console.log('invalid form')
    } else {
      login(values.username, values.password).then(result => {
        if (!result.success) {
          console.log(`login failed: ${result.error}`)
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Center>
        <Box
          safeArea
          p="2"
          py="8"
          w="100%"
          h="100%"
          maxW="290"
          justifyContent="center"
          alignContent="center"
        >
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
          >
            Login
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={errors.username}>
              <Stack direction="row" justifyContent="space-between">
                <FormControl.Label htmlFor="username">
                  Username
                </FormControl.Label>
                <FormControl.ErrorMessage>
                  {errors.usernameError}
                </FormControl.ErrorMessage>
              </Stack>
              <Input
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
                <FormControl.Label htmlFor="password">
                  Password
                </FormControl.Label>
                <FormControl.ErrorMessage>
                  {errors.passwordError}
                </FormControl.ErrorMessage>
              </Stack>
              <Input
                type="text"
                id="password"
                placeholder="CHdfzd51sd?5"
                onChange={event => {
                  handleChange(event, 'password')
                }}
              />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
              >
                Don't have an account?{' '}
              </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                href="#"
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
