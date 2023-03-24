import { useAtom } from 'jotai'
import AuthStack from '../screens/AuthStack'
import MainBottomNavigation from '../screens/MainBottomNavigation'
import { isAuthAtom } from '../stores/isAuth'

export default () => {
  // global state for auth
  const [isAuth] = useAtom(isAuthAtom)

  // check if user is logged in
  return <>{isAuth ? <MainBottomNavigation /> : <AuthStack />}</>
}
