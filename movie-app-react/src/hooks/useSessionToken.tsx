import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

export default () => {
  const key = 'session_id'

  const getSession = async (): Promise<string | false> => {
    try {
      const sessionToken = await getItemAsync(key)
      if (sessionToken) {
        return sessionToken
      }
    } catch (e) {
      console.log('SecureStore getItemAsync error:', e)
    }
    return false
  }

  const setSession = async (sessionToken: string): Promise<void> => {
    try {
      await setItemAsync(key, sessionToken)
    } catch (e) {
      console.log('SecureStore setItemAsync error:', e)
    }
  }

  const deleteSession = async (): Promise<void> => {
    try {
      await deleteItemAsync(key)
    } catch (e) {
      console.log('SecureStore deleteItemAsync error:', e)
    }
  }

  return {
    getSession,
    setSession,
    deleteSession,
  }
}
