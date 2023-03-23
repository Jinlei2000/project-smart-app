import { useState } from 'react'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

export default () => {
  const [values, setValues] = useState<{
    username: string
    password: string
  }>({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState<{
    username: boolean
    usernameError: string
    password: boolean
    passwordError: string
  }>({
    username: false,
    usernameError: '',
    password: false,
    passwordError: '',
  })

  const _validate = (name: string, value: string): void => {
    setErrors({
      ...errors,
      [name]: value === '', // true or false (empty or not)
      [`${name}Error`]: value === '' ? `${name} is required` : '', // error message
    })
  }

  const validateAll = (): boolean => {
    setErrors({
      ...errors,
      username: values.username === '',
      usernameError: values.username === '' ? 'username is required' : '',
      password: values.password === '',
      passwordError: values.password === '' ? 'password is required' : '',
    })

    // return true if there are no errors
    return !errors.username && !errors.password
  }

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ): void => {
    const val = event.nativeEvent.text

    console.log(name, val)

    setValues({
      ...values,
      [name]: val,
    })

    _validate(name, val)
  }

  return {
    values,
    errors,
    handleChange,
    validateAll,
  }
}
