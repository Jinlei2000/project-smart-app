import { createStackNavigator } from '@react-navigation/stack'
import Search from './Search'
import Detail from './Detail'
import ViewAll from './ViewAll'
import BottomTabNavigation from '../BottomTabNavigation'
import Favorites from './Favorites'
import Rated from './Rated'
import DisplayMode from './DisplayMode'
import TakePhoto from './TakePhoto'
import ChooseFromGallery from './ChooseFromGallery'
import RateMovie from './RateMovie'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} 
    // initialRouteName="Search"
    >
      {/* Bottom tab navigation */}
      <Stack.Screen name="HomeBottomTabs" component={BottomTabNavigation} />

      {/* Other screens */}
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="RateMovie" component={RateMovie} />

      {/* Settings */}
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Rated" component={Rated} />
      <Stack.Screen name="DisplayMode" component={DisplayMode} />

      {/* Edit picture */}
      <Stack.Screen name="TakePhoto" component={TakePhoto} />
      <Stack.Screen name="ChooseFromGallery" component={ChooseFromGallery} />
    </Stack.Navigator>
  )
}
