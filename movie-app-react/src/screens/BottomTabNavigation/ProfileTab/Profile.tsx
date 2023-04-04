import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  useColorMode,
  useTheme,
  Pressable,
  Button,
} from 'native-base'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'
import useAuth from '../../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { IUserdata } from '../../../interfaces/IUserdata'
import AvatarPic from '../../../components/avatar/AvatarPic'
import RoundBtn from '../../../components/button/RoundBtn'
import {
  Book,
  BookOpen,
  Camera,
  ChevronRight,
  Heart,
  Moon,
  Star,
  Vibrate,
} from 'lucide-react-native'
import { buttonProps } from '../../../styles/props'
import SettingBtn from '../../../components/button/SettingBtn'
import SettingSwitch from '../../../components/button/SettingSwitch'
import { useAtom } from 'jotai'
import { vibrationModeAtom } from '../../../stores/vibrationMode'

export default () => {
  const { getUser } = useApi()
  const { logout } = useAuth()
  const [userData, setUserData] = useState<IUserdata | null>(null)
  const [vibrationMode, setVibrationMode] = useAtom(vibrationModeAtom)

  useEffect(() => {
    getUser().then((data: IUserdata) => {
      setUserData(data)
    })
  }, [])

  const handleCamera = () => {
    console.log('camera')
  }

  const handleGoTo = () => {
    console.log('go to')
  }

  const handleSwitch = (value: boolean) => {
    console.log(value)
    setVibrationMode(value)
  }

  return (
    <Main>
      <VStack mx={6} mb={8}>
        <Flex
          pt={12}
          flexDirection={'row'}
          justifyContent={'center'}
          flex={1}
          position={'relative'}
        >
          <Box>
            <AvatarPic userDatas={userData} size={'xxl'} />
            <Flex
              position={'absolute'}
              bottom={0}
              right={0}
              _dark={{ borderColor: 'brand.750' }}
              _light={{ borderColor: 'coolGray.300' }}
              borderWidth={1}
              rounded={'full'}
            >
              <RoundBtn handleBtn={handleCamera} icon={Camera} />
            </Flex>
          </Box>
        </Flex>
        <Text fontSize={20} fontWeight={'bold'} mt={4} textAlign={'center'}>
          {userData?.userName}
        </Text>

        <VStack mt={6} mb={4} space={4}>
          <VStack space={2}>
            <SettingBtn
              handleBtn={handleGoTo}
              icon={Heart}
              text={'Favorites'}
            />
            <SettingBtn handleBtn={handleGoTo} icon={Star} text={'Rated'} />
          </VStack>

          <VStack space={2}>
            <SettingBtn
              handleBtn={handleGoTo}
              icon={Moon}
              text={'Display Mode'}
            />
            <SettingSwitch
              handleSwitch={handleSwitch}
              isChecked={vibrationMode}
              icon={Vibrate}
              text={'Vibration Mode'}
            />
          </VStack>

          <VStack space={2}>
            <SettingBtn
              handleBtn={handleGoTo}
              icon={BookOpen}
              text={'Terms of Service'}
            />
          </VStack>

          <Button {...buttonProps} onPress={logout}>
            Logout
          </Button>
        </VStack>
      </VStack>
    </Main>
  )
}
