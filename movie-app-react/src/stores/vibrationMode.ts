// jotai is a state management library for React
import AsyncStorage from '@react-native-async-storage/async-storage'
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

let vibrationMode = atom<boolean>(true)

AsyncStorage.getItem('vibrationMode').then(value => {
  // console.log('value', value)
  if (value !== null) {
    vibrationMode = atom<boolean>(value === 'true' ? true : false)
  } else {
    vibrationMode = atom<boolean>(true)
  }
})

export const vibrationModeAtom = atomWithStorage(
  'vibrationMode',
  vibrationMode as any,
  createJSONStorage(() => AsyncStorage),
)
