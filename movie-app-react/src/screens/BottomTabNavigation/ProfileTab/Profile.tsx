import {
  Box,
  Flex,
  Text,
  VStack,
  Button,
  Skeleton,
  useDisclose,
  Actionsheet,
} from 'native-base'
import Main from '../../../components/generic/Main'
import useApi from '../../../hooks/useApi'
import useAuth from '../../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { IUserdata } from '../../../interfaces/IUserdata'
import AvatarPic from '../../../components/avatar/AvatarPic'
import RoundBtn from '../../../components/button/RoundBtn'
import {
  BookOpen,
  Camera,
  Heart,
  Image,
  Moon,
  Star,
  Trash,
  Vibrate,
} from 'lucide-react-native'
import { bgProps, buttonProps } from '../../../styles/props'
import SettingBtn from '../../../components/button/SettingBtn'
import SettingSwitch from '../../../components/button/SettingSwitch'
import { useAtom } from 'jotai'
import { vibrationModeAtom } from '../../../stores/vibrationMode'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Linking } from 'react-native'
import ActionSheetItem from '../../../components/actionSheet/ActionSheetItem'
import usePhoto from '../../../hooks/usePhoto'
import { isDefaultPhotoAtom } from '../../../stores/isDefaultPhoto'

export default () => {
  const { getUser } = useApi()
  const { logout } = useAuth()
  const [userData, setUserData] = useState<IUserdata | null>(null)
  const [vibrationMode, setVibrationMode] = useAtom(vibrationModeAtom)
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { isOpen, onOpen, onClose } = useDisclose()
  const { deletePhoto, getPhotoUri } = usePhoto()
  const [isDefaultPhoto] = useAtom(isDefaultPhotoAtom)

  useEffect(() => {
    // get user data & check if user has a own photo
    getUser().then((data: IUserdata) => {
      if (!isDefaultPhoto) {
        getPhotoUri().then(uri => {
          if (uri) {
            setUserData({ ...data, avatarUrl: uri })
          }
        })
      } else {
        setUserData(data)
      }
    })
    // rerender when isDefaultPhoto changes
  }, [isDefaultPhoto])

  return (
    <Main>
      <VStack mx={6} mb={8}>
        {userData ? (
          <>
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
                  <RoundBtn handleBtn={onOpen} icon={Camera} />
                </Flex>
              </Box>
            </Flex>

            <Text fontSize={20} fontWeight={'bold'} mt={4} textAlign={'center'}>
              {userData?.userName}
            </Text>
          </>
        ) : (
          <>
            <Flex
              pt={12}
              flexDirection={'row'}
              justifyContent={'center'}
              flex={1}
              position={'relative'}
            >
              <Skeleton height={128} width={128} borderRadius={999} />
            </Flex>

            <Skeleton.Text
              lines={1}
              mt={4}
              width={'1/2'}
              alignSelf={'center'}
            />
          </>
        )}

        <VStack mt={6} mb={4} space={4}>
          <VStack space={2}>
            <SettingBtn
              handleBtn={() => navigate('Favorites')}
              icon={Heart}
              text={'Favorites'}
            />
            <SettingBtn
              handleBtn={() => navigate('Rated')}
              icon={Star}
              text={'Rated'}
            />
          </VStack>

          <VStack space={2}>
            <SettingBtn
              handleBtn={() => navigate('DisplayMode')}
              icon={Moon}
              text={'Display Mode'}
            />
            <SettingSwitch
              handleSwitch={setVibrationMode}
              isChecked={vibrationMode}
              icon={Vibrate}
              text={'Vibration Mode'}
            />
          </VStack>

          <VStack space={2}>
            <SettingBtn
              handleBtn={() => {
                Linking.openURL(
                  'https://www.termsfeed.com/live/c19b8c63-b6b3-439e-bd21-b813521029a7',
                )
              }}
              icon={BookOpen}
              text={'Terms of Service'}
            />
          </VStack>

          <Button {...buttonProps} onPress={logout}>
            Logout
          </Button>
        </VStack>
      </VStack>

      {/* Actionsheet edit profile picture */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content roundedTop={32} {...bgProps}>
          <ActionSheetItem
            icon={Camera}
            text={'Take photo'}
            onPress={() => {
              console.log('take photo')
              onClose()
              navigate('TakePhoto')
            }}
          />
          <ActionSheetItem
            icon={Image}
            text={'Choose from gallery'}
            onPress={() => {
              console.log('choose from gallery')
            }}
          />
          <ActionSheetItem
            icon={Trash}
            text={'Use default photo'}
            onPress={() => {
              console.log('use default photo')
              deletePhoto().then(() => {
                onClose()
              })
            }}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Main>
  )
}
