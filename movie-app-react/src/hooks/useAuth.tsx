import { useState } from 'react'

export default () => {
  const API_KEY = process.env.API_KEY
  const [isAuth, setIsAuth] = useState(false)

  const _getRequestToken = async () => {
    const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  }

  const _getSessionToken = async (requestToken: string) => {
    const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`
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
    console.log(data)
  }

  const login = async (username: string, password: string) => {
    console.log(API_KEY)
    // const requestToken = await _getRequestToken()

    // const url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //     request_token: requestToken,
    //   }),
    // })
    // const data = await response.json()
    // console.log(data)
  }

  const logout = async () => {
    // TODO: get session id from secure storage and delete it

    const url = `https://api.themoviedb.org/3/authentication/session?api_key=${API_KEY}`
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
  }
}
