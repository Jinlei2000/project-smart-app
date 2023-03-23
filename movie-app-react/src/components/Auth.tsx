import useAuth from '../hooks/useAuth'
import AuthStack from '../screens/AuthStack'
import MainBottomNavigation from '../screens/MainBottomNavigation'

export default () => {
  const { isAuth } = useAuth()

  return <>{isAuth ? <MainBottomNavigation /> : <AuthStack />}</>
}
