import { useAtom } from 'jotai'
import AuthStack from '../screens/AuthStack'
import { isAuthAtom } from '../stores/isAuth'
import MainStackNavigation from '../screens/MainStackNavigation'

export default () => {
  // global state for auth
  const [isAuth] = useAtom(isAuthAtom)
  // console.log('isAuth', isAuth)

  // If I use atomWithStorage from jotai/utils (refresh to much)
  // if (isAuth !== null) {
  //   if (isAuth === false) {
  //     return <AuthStack />
  //   } else if (isAuth === true) {
  //     return <MainStackNavigation />
  //   }
  // } else {
  //   return <></>
  // }

  // check if user is logged in
  return <>{isAuth ? <MainStackNavigation /> : <AuthStack />}</>
}
