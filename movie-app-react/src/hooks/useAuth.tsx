import { useAtom } from 'jotai'
import { isAuthAtom } from '../stores/isAuth'
import { BASE_URL } from '../constants'

// file is temporarily
import { API_KEY } from '../../env'
import useSessionToken from './useSessionToken'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default () => {
  // global state for auth
  const [isAuth, setIsAuth] = useAtom(isAuthAtom)
  const { setSession, deleteSession, getSession } = useSessionToken()
  let userError = ''
  const apiKey = API_KEY

  const _setGlobalIsAuth = async (value: boolean) => {
    await AsyncStorage.setItem('isAuth', value.toString())
    setIsAuth(value)
  }

  const _getRequestToken = async (): Promise<string> => {
    const requestTokenResponse = await fetch(
      `${BASE_URL}/authentication/token/new?api_key=${apiKey}`,
    )

    if (!requestTokenResponse.ok) {
      userError = 'Something wrong with server, try again later'
      throw new Error(
        `Failed to get request token: ${requestTokenResponse.statusText}`,
      )
    }

    const data = await requestTokenResponse.json()
    return data.request_token
  }

  const getSessionToken = async (
    requestToken: string,
  ): Promise<string | false> => {
    const url = `${BASE_URL}/authentication/session/new?api_key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    })

    if (!response.ok) {
      userError = 'Something wrong with server, try again later'
      throw new Error(`Failed to get session token: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.success) {
      console.log('Session token:', data.session_id)
      // save session id to secure storage
      await setSession(data.session_id)
      // set isAuth to true in global state
      await _setGlobalIsAuth(true)
      return data.session_id
    }
    return false
  }

  const login = async (
    username: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const requestToken = await _getRequestToken()

      const loginResponse = await fetch(
        `${BASE_URL}/authentication/token/validate_with_login?api_key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            request_token: requestToken,
          }),
        },
      )

      if (!loginResponse.ok) {
        userError = 'Invalid username or password'
        throw new Error(
          `Failed to validate request token: ${loginResponse.statusText}`,
        )
      }

      const loginData = await loginResponse.json()

      if (!loginData.success) {
        userError = 'Invalid username or password'
        throw new Error('Invalid username or password')
      }

      const sessionToken = await getSessionToken(requestToken)

      if (!sessionToken) {
        userError = 'Something wrong with server, try again later'
        throw new Error('Failed to get session token')
      }

      return { success: true }
    } catch (error) {
      // console.error(error)
      return { success: false, error: userError }
    }
  }

  const logout = async () : Promise<void> => {
    // get session id from secure storage
    const sessionToken = await getSession()

    // delete session id from server
    const logoutResponse = await fetch(
      `${BASE_URL}/authentication/session?api_key=${apiKey}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionToken,
        }),
      },
    )

    const data = await logoutResponse.json()

    if (!data.success || !logoutResponse.ok) {
      throw new Error('Failed to delete session token from server')
    }

    // remove session id from secure storage
    await deleteSession()
    // set isAuth to false in global state (go back to login screen)
    await _setGlobalIsAuth(false)
  }

  return {
    login,
    logout,
    isAuth,
  }
}
