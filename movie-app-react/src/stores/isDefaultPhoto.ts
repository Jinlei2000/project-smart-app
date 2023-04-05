// jotai is a state management library for React
import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

let isDefaultPhoto = atom<boolean>(true)

AsyncStorage.getItem('photo').then(photoUri => {
  if (photoUri) {
    isDefaultPhoto = atom<boolean>(false)
  } else {
    isDefaultPhoto = atom<boolean>(true)
  }
})

export const isDefaultPhotoAtom = atomWithStorage(
  'isDefaultPhoto',
  isDefaultPhoto as any,
  createJSONStorage(() => AsyncStorage),
)
