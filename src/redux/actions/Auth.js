import Axios from 'axios';
import {showLoading, showPopUp} from './popUpActions';
import AsyncStorage from '@react-native-community/async-storage';
import SetAuthToken from './setAuthToken';

const configJson = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const loadData = () => async dispatch => {
  dispatch(showLoading(true));
  if (await AsyncStorage.getItem('token')) {
    SetAuthToken(await AsyncStorage.getItem('token'));
  }

  try {
    const result = await Axios.get(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/load`,
      configJson,
    );
    dispatch({
      type: 'LOAD_DATA',
      payload: result.data.data,
    });
    dispatch(showLoading(false));
  } catch (error) {
    dispatch(showPopUp({message: error.response.data.message == "Invalid Token" ? 'Session Expired' : error.response.data.message}));
    dispatch(showLoading(false));
    error.response.data.message == "Invalid Token" && dispatch(logout())
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};
export const userLogin = data => async dispatch => {
  try {
    dispatch(showLoading(true));
    const results = await Axios.post(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/login`,
      data,
      configJson,
    );
    SetAuthToken(results.data.data.token);
    await AsyncStorage.setItem('token', results.data.data.token);
    dispatch({
      type: 'LOGIN',
      payload: results.data.data,
    });
    dispatch(showLoading(false));
  } catch (error) {
    dispatch(showLoading(false));
    dispatch(showPopUp({message: error.response.data.message}));
  }
};
export const logout = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type: 'LOGOUT',
  });
};
