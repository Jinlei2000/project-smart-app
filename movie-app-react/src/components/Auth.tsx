import { useAtom } from 'jotai'
import AuthStack from '../screens/AuthStack'
import MainBottomNavigation from '../screens/MainBottomNavigation'
import { isAuthAtom } from '../stores/isAuth'

export default () => {
  // global state for auth
  const [isAuth] = useAtom(isAuthAtom)
  // console.log('isAuth', isAuth)

  // If I use atomWithStorage from jotai/utils (refresh to much)
  // if (isAuth !== null) {
  //   if (isAuth === false) {
  //     return <AuthStack />
  //   } else if (isAuth === true) {
  //     return <MainBottomNavigation />
  //   }
  // } else {
  //   return <></>
  // }

  // check if user is logged in
  return <>{isAuth ? <MainBottomNavigation /> : <AuthStack />}</>
}
