import Main from '../../components/generic/Main'
import { useEffect, useState } from 'react'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Cog, Import } from 'lucide-react-native'
import { requestPermissionsAsync } from 'expo-media-library'
import usePhoto from '../../hooks/usePhoto'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import InfoView from '../../components/generic/InfoView'

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const { savePhotoInAsyncStorage } = usePhoto()
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | undefined
  >()
  const { goBack } = useNavigation<StackNavigationProp<ParamListBase>>()

  // open the library and get the photo
  const openPhotoLibrary = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const newPhoto = {
        uri: result.assets[0].uri,
      }

      setIsLoading(true)

      // save photo
      await savePhotoInAsyncStorage(newPhoto)

      goBack()
    }

    if (result.canceled) {
      goBack()
    }
  }

  useEffect(() => {
    // Ask for media library permission
    ;(async () => {
      const mediaLibraryPermission = await requestPermissionsAsync()
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })()

    openPhotoLibrary()
  }, [])

  if (hasMediaLibraryPermission === undefined) {
    // Requesting for media library permission
    return <Main scroll={false}></Main>
  } else if (!hasMediaLibraryPermission) {
    // Permission denied
    return (
      <InfoView
        title={'Permission Needed'}
        description={
          'Permission to access photo library has been denied, please enable it in your settings'
        }
        icon={Cog}
      />
    )
  }

  return (
    <>
      {!isLoading ? (
        <Main scroll={false}></Main>
      ) : (
        <InfoView
          title={'Saving photo'}
          description={'Please wait while we save your photo'}
          icon={Import}
          hasButton={false}
        />
      )}
    </>
  )
}
