import { createStackNavigator } from '@react-navigation/stack'
import Search from './Search'
import Detail from './Detail'
import ViewAll from './ViewAll'
import Rating from './Rating'
import BottomTabNavigation from '../BottomTabNavigation'
import Favorites from './Favorites'
import Rated from './Rated'
import DisplayMode from './DisplayMode'
import TakePhoto from './TakePhoto'
import ChooseFromGallery from './ChooseFromGallery'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}
    initialRouteName="Detail"
    >
      {/* Bottom tab navigation */}
      <Stack.Screen name="HomeBottomTabs" component={BottomTabNavigation} />

      {/* Other screens */}
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="Rating" component={Rating} />

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
