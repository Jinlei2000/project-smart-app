import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAssetAsync } from 'expo-media-library'
import { useAtom } from 'jotai'
import { isDefaultPhotoAtom } from '../stores/isDefaultPhoto'

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
    const photo = await AsyncStorage.getItem(key)
    return photo
  }

  return {
    savePhotoInMediaLibrary,
    deletePhoto,
    getPhotoUri,
  }
}
