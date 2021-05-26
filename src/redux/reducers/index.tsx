import {combineReducers} from 'redux';
import settingReducer from './settingReducer';
import popUpReducer from './popUpReducer';
import taskReducer from './taskReducer';
import Auth from './Auth';
import Karyawan from './Karyawan';

export default combineReducers({
  settings: settingReducer,
  popup: popUpReducer,
  task: taskReducer,
  Auth,
  Karyawan,
});
