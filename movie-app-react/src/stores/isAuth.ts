// jotai is a state management library for React
import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

let isAuthAtom = atom<boolean>(false)

AsyncStorage.getItem('isAuth').then(value => {
  // console.log('value', value)
  if (value !== null) {
    if (value === 'true') {
      isAuthAtom = atom<boolean>(true)
    } else if (value === 'false') {
      isAuthAtom = atom<boolean>(false)
    }
  } else {
    isAuthAtom = atom<boolean>(false)
  }
})

export { isAuthAtom }

// This use AsyncStorage to store the state with atomWithStorage
// Problem if i refresh the app, i get first the initialValue and then the value from AsyncStorage
// export const isAuthAtom = atomWithStorage(
//   'isAuth',
//   null,
//   createJSONStorage(() => AsyncStorage),
// )
