import {
  Box,
  Button,
  Flex,
  Image,
  Pressable,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base'
import Main from '../../components/generic/Main'
import { Camera, CameraType } from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import RoundBtn from '../../components/button/RoundBtn'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Check, ChevronLeft, Cog, SwitchCamera, X } from 'lucide-react-native'
import { requestPermissionsAsync } from 'expo-media-library'
import { buttonProps, textProps } from '../../styles/props'
import usePhoto from '../../hooks/usePhoto'

export default () => {
  const { savePhotoInMediaLibrary, deletePhoto } = usePhoto()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()
  let cameraRef = useRef<any>()
  const [type, setType] = useState(CameraType.front)
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >()
  const [photo, setPhoto] = useState<any>()

  const { navigate, goBack } =
    useNavigation<StackNavigationProp<ParamListBase>>()

  useEffect(() => {
    // Ask for camera permission and media library permission
    ;(async () => {
      const mediaLibraryPermission = await requestPermissionsAsync()
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === 'granted')
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })()
  }, [])

  if (
    hasCameraPermission === undefined ||
    hasMediaLibraryPermission === undefined
  ) {
    return (
      <Text>Requesting for camera permission and media library permission</Text>
    )
  } else if (!hasCameraPermission || !hasMediaLibraryPermission) {
    return (
      <Main scroll={false}>
        <Box mx={6}>
          <Flex
            justifyContent={'center'}
            h={'100%'}
            w={'100%'}
            alignItems={'center'}
          >
            <VStack alignItems="center">
              <Cog
                size={128}
                color={
                  colorMode === 'dark'
                    ? colors.brand[200]
                    : colors.coolGray[300]
                }
                style={{ marginBottom: 24 }}
              />
              <Text
                {...textProps.primaryColor}
                fontSize={18}
                fontWeight="semibold"
              >
                Permission Needed
              </Text>
              <Text
                maxW="70%"
                {...textProps.secondaryColor}
                fontSize={16}
                fontWeight="regular"
                textAlign="center"
              >
                Permission to access camera or photo library has been denied,
                please enable it in your settings
              </Text>
            </VStack>

            <Button
              {...buttonProps}
              onPress={() => goBack()}
              position="absolute"
              width="100%"
              bottom={20}
            >
              Go Back
            </Button>
          </Flex>
        </Box>
      </Main>
    )
  }

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back)
  }

  const takePicture = async () => {
    console.log('Taking picture')
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    }

    try {
      const newPhoto = await cameraRef.current.takePictureAsync(options)
      console.log('Photo taken')
      //   console.log(newPhoto)
      setPhoto(newPhoto)
    } catch (error) {
      console.log('Error taking picture', error)
    }
  }

  const handleSavePhoto = async () => {
    console.log('Saving photo')

    //delete photo
    await deletePhoto()

    //save photo
    await savePhotoInMediaLibrary(photo)

    setTimeout(() => {
      goBack()
    }, 1000)
  }

  if (photo) {
    return (
      <Main scroll={false}>
        <Flex
          position={'relative'}
          h={'100%'}
          w={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            alt={'Preview of your photo'}
            source={{ uri: photo.uri }}
            style={styles.camera}
          />
        </Flex>

        {/* Controls */}
        <Box position={'absolute'} bottom={0} w={'100%'}>
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDir={'row'}
            p={6}
            position={'relative'}
          >
            <RoundBtn
              handleBtn={() => {
                setPhoto(null)
              }}
              icon={X}
              size={'md'}
            />

            <RoundBtn handleBtn={handleSavePhoto} icon={Check} size={'md'} />
          </Flex>
        </Box>
      </Main>
    )
  }

  return (
    <>
      <Main scroll={false}>
        <Flex
          position={'relative'}
          h={'100%'}
          w={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Camera
            style={styles.camera}
            type={type}
            ratio="1:1"
            ref={cameraRef}
          />
        </Flex>

        {/* Controls */}
        <Box position={'absolute'} bottom={0} w={'100%'}>
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDir={'row'}
            p={6}
            position={'relative'}
          >
            <RoundBtn handleBtn={goBack} icon={ChevronLeft} size={'md'} />
            <Pressable
              onPress={takePicture}
              rounded={'full'}
              w={20}
              h={20}
              borderWidth={10}
              _dark={{
                bg: 'brand.700',
                borderColor: 'brand.750',
              }}
              _light={{
                bg: 'coolGray.200',
                borderColor: 'coolGray.300',
              }}
            />
            <RoundBtn
              handleBtn={toggleCameraType}
              icon={SwitchCamera}
              size={'md'}
            />
          </Flex>
        </Box>
      </Main>
    </>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    marginTop: -Dimensions.get('window').height * 0.2,
  },
})
