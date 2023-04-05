import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAssetAsync, addListener } from 'expo-media-library'
import { useAtom } from 'jotai'
import { isDefaultPhotoAtom } from '../stores/isDefaultPhoto'
import { getInfoAsync } from 'expo-file-system'

export default () => {
  const [isDefaultPhoto, setIsDefaultPhoto] = useAtom(isDefaultPhotoAtom)
  const key = 'photo'

  const savePhotoInMediaLibrary = async (photo: any) => {
    setIsDefaultPhoto(false)
    //save in media library get new uri
    const asset = await createAssetAsync(photo.uri)
    const photoLocationUri = asset.uri
    // console.log('Photo saved in media library', photoLocationUri)

    //save in async storage
    await AsyncStorage.setItem(key, photoLocationUri)
  }

  const deletePhoto = async () => {
    setIsDefaultPhoto(true)
    await AsyncStorage.removeItem(key)
  }

  const getPhotoUri = async () => {
    const photoUri = await AsyncStorage.getItem(key)

    return photoUri
  }

  // check if photo exists in media library (if user deleted it)
  addListener(() => {
    if (!isDefaultPhoto) {
      getPhotoUri().then(uri => {
        _checkIfPhotoExists(uri).then(exists => {
          if (!exists) {
            deletePhoto()
          }
        })
      })
    }
  })

  const _checkIfPhotoExists = async (uri: any) => {
    const fileInfo = await getInfoAsync(uri)
    return fileInfo.exists
  }

  return {
    savePhotoInMediaLibrary,
    deletePhoto,
    getPhotoUri,
  }
}
