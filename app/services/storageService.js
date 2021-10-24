import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
}

export const readData = async (key) => {
    try {
      const names = await AsyncStorage.getItem(key)
      if (names !== null) {
        return(names)
      } else {
        return('')
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }