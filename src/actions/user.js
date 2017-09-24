import { AsyncStorage } from 'react-native'

export const login = () => ({
  type: 'LOGIN',
})

export const getUserInfo = info => ({
  type: 'GET_USER_INFO',
  info,
})

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('@twitter-clone')
    return dispatch({
      type: 'LOGOUT',
    })
  } catch (error) {
    throw error
  }
}
