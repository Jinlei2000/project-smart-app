import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ChevronLeft, Search } from 'lucide-react-native'
import {
  View,
  Text,
  VStack,
  HStack,
  Box,
  useSafeArea,
  useColorMode,
} from 'native-base'
import { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { INavbarOptions } from '../../interfaces/INavbarOptions'
import { IUserdata } from '../../interfaces/IUserdata'
import { textProps } from '../../styles/props'
import RoundBtn from '../button/RoundBtn'
import AvatarPic from '../avatar/AvatarPic'
import { Platform } from 'react-native'
import { BlurView } from 'expo-blur'
import { useAtom } from 'jotai'
import { isDefaultPhotoAtom } from '../../stores/isDefaultPhoto'
import usePhoto from '../../hooks/usePhoto'

// PLEASE PLACE THE NAVHEADER COMPONENT UNDER ALL OTHER COMPONENTS
// ELSE THE BLURVIEW WILL NOT WORK PROPERLY

export default ({ navBarOptions }: { navBarOptions: INavbarOptions }) => {
  const safeAreaProps = useSafeArea({
    safeArea: true,
    pt: 2,
  })
  const { getUser } = useApi()
  const { navigate, goBack } =
    useNavigation<StackNavigationProp<ParamListBase>>()
  const { colorMode } = useColorMode()
  const [leftItem, setLeftItem] = useState<JSX.Element[]>([])
  const [rightItem, setRightItem] = useState<JSX.Element[]>([])
  const [userData, setUserData] = useState<IUserdata>({
    userName: 'User',
  })
  const [isDefaultPhoto] = useAtom(isDefaultPhotoAtom)
  const { getPhotoUri } = usePhoto()

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

  useEffect(() => {
    // console.log('navBarOptions', navBarOptions)
    const { left, right, leftTitle } = navBarOptions
    if (left === 'Name&Text') {
      setLeftItem([
        <VStack key="left">
          <Text
            fontSize={24}
            fontWeight={'bold'}
            lineHeight={24}
            {...textProps.primaryColor}
          >
            Hi, {userData?.userName}
          </Text>
          <Text
            fontSize={12}
            fontWeight={'medium'}
            lineHeight={12}
            {...textProps.secondaryColor}
          >
            Let's explore some movies
          </Text>
        </VStack>,
      ])
    } else if (left === 'Back&Title') {
      setLeftItem([
        <HStack key="left" alignItems="center" space={4}>
          <RoundBtn handleBtn={goBack} icon={ChevronLeft} />
          <Text
            fontSize={24}
            fontWeight={'semibold'}
            lineHeight={29}
            {...textProps.primaryColor}
          >
            {leftTitle}
          </Text>
        </HStack>,
      ])
    } else if (left === 'Title') {
      setLeftItem([
        <Text
          key="left"
          fontSize={24}
          fontWeight={'bold'}
          lineHeight={29}
          {...textProps.primaryColor}
        >
          {leftTitle}
        </Text>,
      ])
    }
    if (right === 'Search&Profile') {
      setRightItem([
        <HStack space={2} key="right">
          <RoundBtn handleBtn={handleSearch} icon={Search} />
          <AvatarPic userDatas={userData} />
        </HStack>,
      ])
    }
  }, [navBarOptions, userData])

  const handleSearch = () => {
    navigate('Search')
  }

  const children = (
    <Box {...safeAreaProps} px={6} h={20} justifyContent="center" py={2}>
      <HStack alignItems="center" justifyContent="space-between">
        {leftItem}
        {rightItem}
      </HStack>
    </Box>
  )

  return (
    <>
      {Platform.OS === 'ios' ? (
        <BlurView
          tint={colorMode === 'dark' ? 'dark' : 'light'}
          intensity={50}
          style={{
            zIndex: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: colorMode === 'dark' ? '#1E1F27B3' : '#F3F4F6B3',
          }}
        >
          {children}
        </BlurView>
      ) : (
        <View
          position="absolute"
          top={0}
          left={0}
          right={0}
          zIndex={100}
          bg={colorMode === 'dark' ? '#1e1e24' : '#f3f4f6'}
          shadow={1}
        >
          {children}
        </View>
      )}
    </>
  )
}
