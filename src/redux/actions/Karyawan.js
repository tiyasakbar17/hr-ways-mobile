import Axios from 'axios';
import {showLoading, showPopUp} from './popUpActions';

const configJson = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const getKaryawan = ({page, restore, keyword}) => async dispatch => {
  try {
    dispatch(showLoading(true));
    const results = await Axios.get(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/karyawan/all?page=${page}&keyword=${keyword}&restore=${restore ? restore : ''}`,
      configJson,
    );
    dispatch({
      type: 'GET_KARYAWAN',
      payload: results.data.data,
    });
    dispatch(showLoading(false));
    return true;
  } catch (error) {
    dispatch(showLoading(false));
    dispatch(showPopUp({message: error.response.data.message}));
    return false;
  }
};

export const karyawanByKtp = data => async dispatch => {
  try {
    dispatch(showLoading(true));
    const results = await Axios.get(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/karyawan?ktp=${data}`,
      configJson,
    );
    dispatch({
      type: 'GET_KARYAWAN_KTP',
      payload: results.data.data,
    });
    dispatch(showLoading(false));
    return true;
  } catch (error) {
    dispatch(showLoading(false));
    dispatch({
      type: 'GET_KARYAWAN_KTP',
      payload: null,
    });
    dispatch(showPopUp({message: error.response.data.message}));
    return false;
  }
};

export const resetKaryawanByKtp = data => async dispatch => {
  try {
    dispatch({
      type: 'GET_KARYAWAN_KTP',
      payload: null,
    });
  } catch (error) {}
};

export const deleteKaryawan = (id, keyword) => async (dispatch, getState) => {
  try {
    const {Karyawan} = getState();
    dispatch(showLoading(true));
    const results = await Axios.delete(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/karyawan/delete?id=${id}`,
      configJson,
    );
    dispatch(getKaryawan({page: Karyawan.pageNow, keyword, restore: ''}));
    dispatch(showPopUp({message: results.data.message}));
  } catch (error) {
    dispatch(showLoading(false));
    dispatch(showPopUp({message: error.response.data.message}));
  }
};

export const restoreKaryawan = (id, keyword) => async (dispatch, getState) => {
  try {
    const {Karyawan} = getState();
    dispatch(showLoading(true));
    const results = await Axios.patch(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/karyawan/restore?id=${id}`,
      configJson,
    );
    dispatch(getKaryawan({page: Karyawan.pageNow, keyword, restore: true}));
    dispatch(showPopUp({message: results.data.message}));
  } catch (error) {
    dispatch(showLoading(false));
    dispatch(showPopUp({message: error.response.data.message}));
  }
};

export const addKaryawan = data => async dispatch => {
  try {
    dispatch(showLoading(true));
    const results = await Axios.post(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/karyawan/add`,
      data,
      configJson,
    );
    dispatch(getKaryawan({page: 1, restore: '', keyword: ''}));
    dispatch(showPopUp({message: results.data.message, redir: true}));
  } catch (error) {
    dispatch(showLoading(false));
    dispatch(showPopUp({message: error.response.data.message}));
  }
};

export const editKaryawan = data => async dispatch => {
  try {
    dispatch(showLoading(true));
    const results = await Axios.patch(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/karyawan/edit`,
      data,
      configJson,
    );
    dispatch({
      type: 'EDIT_KARYAWAN',
      payload: results.data.data,
    });
    dispatch(showPopUp({message: results.data.message, redir: true}));
    dispatch(showLoading(false));
  } catch (error) {
    dispatch(showLoading(false));
    dispatch(showPopUp({message: error.response.data.message}));
  }
};

export const getAddress = ({
  provinsi,
  kabupaten,
  kecamatan,
  scope,
}) => async dispatch => {
  try {
    const results = await Axios.get(
      `https://tiyas-hr-ways.herokuapp.com/api/v1/full/address?provinsi=${provinsi}&kabupaten=${kabupaten}&kecamatan=${kecamatan}`,
      configJson,
    );
    dispatch({
      type: 'GET_ADDRESS',
      payload: {
        scope,
        data: results.data.data,
      },
    });
    return true;
  } catch (error) {
    dispatch(showPopUp({message: error.response.data.message}));
    return false;
  }
};
