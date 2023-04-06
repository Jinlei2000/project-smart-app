import { Box, Flex, Image, Pressable } from 'native-base'
import Main from '../../components/generic/Main'
import { Camera, CameraType } from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import RoundBtn from '../../components/button/RoundBtn'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Check, ChevronLeft, Cog, SwitchCamera, X } from 'lucide-react-native'
import { requestPermissionsAsync } from 'expo-media-library'
import usePhoto from '../../hooks/usePhoto'
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics'
import InfoView from '../../components/generic/InfoView'

export default () => {
  const { savePhotoInMediaLibrary } = usePhoto()
  let cameraRef = useRef<any>()
  const [type, setType] = useState(CameraType.front)
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | undefined
  >()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >()
  const [photo, setPhoto] = useState<any>()
  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>()

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
    // Requesting for camera permission and media library permission
    return <Main scroll={false}></Main>
  } else if (!hasCameraPermission || !hasMediaLibraryPermission) {
    // Permission denied
    return (
      <InfoView
        title={'Permission Needed'}
        description={
          'Permission to access camera or photo library has been denied, please enable it in your settings'
        }
        icon={Cog}
      />
    )
  }

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back)
  }

  const takePicture = async () => {
    // console.log('Taking picture')
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    }

    try {
      const newPhoto = await cameraRef.current.takePictureAsync(options)
      // console.log('Photo taken')
      //   console.log(newPhoto)

      // haptic feedback
      impactAsync(ImpactFeedbackStyle.Medium)

      setPhoto(newPhoto)
    } catch (error) {
      // console.log('Error taking picture', error)
    }
  }

  const handleSavePhoto = async () => {
    // console.log('Saving photo')

    //save photo
    await savePhotoInMediaLibrary(photo)

    setTimeout(() => {
      goBack()
    }, 1000)
  }

  // camera view or preview of taken photo
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
          {photo ? (
            // Preview of taken photo
            <Image
              alt={'Preview of your photo'}
              source={{ uri: photo.uri }}
              style={styles.camera}
            />
          ) : (
            // Camera
            <Camera
              style={styles.camera}
              type={type}
              ratio="1:1"
              ref={cameraRef}
            />
          )}
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
            {photo ? (
              // show controls for preview
              <>
                <RoundBtn
                  handleBtn={() => {
                    setPhoto(null)
                  }}
                  icon={X}
                  size={'md'}
                />
                <RoundBtn
                  handleBtn={handleSavePhoto}
                  icon={Check}
                  size={'md'}
                />
              </>
            ) : (
              // show controls for camera
              <>
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
              </>
            )}
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
