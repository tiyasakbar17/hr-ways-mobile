import AsyncStorage from "@react-native-community/async-storage"

/*---------------------------------------pengaturan--------------------------------------- */
const SET_MODE = 'SET_MODE'
const LOAD_LOCAL_SETTING = 'LOAD_LOCAL_SETTING'
const SET_SETTING = 'SET_SETTING'
/*---------------------------------------pengaturan--------------------------------------- */

/*-----------------------------------------tugas------------------------------------------ */
const LOAD_LOCAL_TASK = 'LOAD_LOCAL_TASK'
const SET_TASK = 'SET_TASK'
/*-----------------------------------------tugas------------------------------------------ */

/*-----------------------------------------popup------------------------------------------ */
const SHOW_LOADING = 'SHOW_LOADING'
const SHOW_POPUP = 'SHOW_POPUP'
const CLOSE_POPUP = 'CLOSE_POPUP'
/*-----------------------------------------popup------------------------------------------ */

/*---------------------------------------catatatan---------------------------------------- */
/*---------------------------------------catatatan---------------------------------------- */

/*---------------------------------------asyc data---------------------------------------- */
const getLocalSetting = async () => await AsyncStorage.getItem('pengaturan')
const setLocalSettig = async (item: object) => await AsyncStorage.setItem('pengaturan', JSON.stringify(item))
/*---------------------------------------asyc data---------------------------------------- */


export { SET_MODE, LOAD_LOCAL_SETTING, LOAD_LOCAL_TASK, SET_SETTING, SET_TASK, SHOW_POPUP, CLOSE_POPUP, SHOW_LOADING, getLocalSetting, setLocalSettig }