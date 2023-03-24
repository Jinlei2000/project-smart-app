import { useAtom } from 'jotai'
import { useState } from 'react'
import { isAuthAtom } from '../stores/isAuth'

export default () => {
  // global state for auth
  const [isAuth, setIsAuth] = useAtom(isAuthAtom)
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const apiKey = ''

  const _getRequestToken = async () => {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    return data.request_token
  }

  const _getSessionToken = async (requestToken: string) => {
    const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    })
    const data = await response.json()
    console.log('session token: ', data.session_id)
    // if (data.success) {
    //   setIsAuth(true)
    // }
  }

  const login = async (username: string, password: string) => {
    const requestToken = await _getRequestToken()
    const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        request_token: requestToken,
      }),
    })
    const data = await response.json()
    // console.log(data)
    if (data.success) {
      await _getSessionToken(requestToken)
    } else {
      // login failed
      setIsLoginFailed(true)
    }
  }

  const logout = async () => {
    // TODO: get session id from secure storage and delete it

    const url = `https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: 'SESSION_ID',
      }),
    })
    const data = await response.json()
    console.log(data)
  }

  return {
    login,
    logout,
    isAuth,
    isLoginFailed,
  }
}
