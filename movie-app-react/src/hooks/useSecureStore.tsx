export default () => {
  const getSecureStore = async (key: string) => {}

  const setSecureStore = async (key: string, value: string) => {}

  const deleteSecureStore = async (key: string) => {}

  // EXAMPLE CODE FROM EXPO DOCS !!!
  // async function save(key, value) {
  //   await SecureStore.setItemAsync(key, value)
  // }

  // async function getValueFor(key) {
  //   let result = await SecureStore.getItemAsync(key)
  //   if (result) {
  //     alert("🔐 Here's your value 🔐 \n" + result)
  //   } else {
  //     alert('No values stored under that key.')
  //   }
  // }
  return {
    getSecureStore,
    setSecureStore,
    deleteSecureStore,
  }
}
