import { AsyncStorage } from 'react-native';

const set = async (key, value) => {
  if (!key) {
    return ;
  }

  if (typeof key !== 'string') {
    key = JSON.stringify(key)
  }

  await AsyncStorage.setItem(key, JSON.stringify(value))
}

const get = async (key) => {
  if (!key) {
    return ;
  }

  const value = await AsyncStorage.getItem(key)
  const valueJson = value ? JSON.parse(value) : ""
  return valueJson
}

export default {
  get,
  set
}
