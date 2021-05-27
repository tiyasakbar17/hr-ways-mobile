import {RouteProp, useIsFocused} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Button from '../components/global/components/Button';
import FormTextInput from '../components/global/components/FormTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import MainContainer from '../components/global/components/MainContainer';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/global/types/reduxHooks';
import {Size} from '../components/global/types/Sizing';
import theme, {Box, Text} from '../components/global/types/theme';
import {MainRoutes} from '../tabs/MainNavigator';
import Loader from '../components/global/components/Loader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {addKaryawan, editKaryawan, getAddress} from '../redux/actions/Karyawan';
import {showPopUp} from '../redux/actions/popUpActions';
import PopUpComponent from '../components/global/components/PopUpComponent';

interface Props {
  navigation: StackNavigationProp<MainRoutes>;
  route: iParams;
}
interface iParams {
  params?: iRoute;
}
interface iRoute {
  type: 'add' | 'view' | 'edit';
  formData?: iFormData;
  id?: number
}
interface iFormData {
  nama?: string;
  tempatLahir?: string;
  tanggalMasuk: Date;
  tanggalLahir: Date;
  nomorKtp?: string;
  nomorKk?: string;
  npwp?: string;
  bank?: string;
  nomorRekening?: string;
  gaji?: string;
  provinsi?: string | Date;
  kabupaten?: string | Date;
  kecamatan?: string | Date;
  kelurahan?: string | Date;
  kodePos?: string;
  detailAlamat?: string;
}

const TambahTarget = ({navigation, route}: Props) => {
  const {params} = route;
  const isFocus = useIsFocused();
  const {isLoading, isPopedUp} = useAppSelector(state => state.popup);
  const {
    oneData,
    alamat: {provinsi, kabupaten, kecamatan, kelurahan},
  } = useAppSelector(state => state.Karyawan);
  const initialState: {
    formData: iFormData;
    showDate: boolean;
    dateForm: 'tanggalMasuk' | 'tanggalLahir';
    scope: 'provinsi' | 'kabupaten' | 'kecamatan' | 'kelurahan';
    type: 'add' | 'view' | 'edit';
    id?: number
  } = {
    id: undefined,
    type: 'add',
    showDate: false,
    dateForm: 'tanggalMasuk',
    scope: 'provinsi',
    formData: {
      nama: '',
      tempatLahir: '',
      tanggalMasuk: new Date(),
      tanggalLahir: new Date(),
      nomorKtp: '',
      nomorKk: '',
      npwp: '',
      bank: '',
      nomorRekening: '',
      gaji: '',
      provinsi: '',
      kabupaten: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
      detailAlamat: '',
    },
  };
  const [state, setstate] = useState(initialState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isFocus) {
      if (params) {
        setstate(prev => ({...prev, type: params.type}));
        if (params.formData) {
          const tanggalLahir = new Date(params.formData.tanggalLahir)
          const tanggalMasuk = new Date(params.formData.tanggalMasuk)
          setstate(prev => ({...prev, ...params, formData: {...params.formData, tanggalLahir, tanggalMasuk}}));
        }
      }
    }
    if (oneData || (params && params.formData)) {
      dispatch(
        getAddress({
          provinsi: oneData ? oneData.alamat.provinsi : params?.formData?.provinsi,
          kabupaten: '',
          kecamatan: '',
          scope: 'kabupaten',
        }),
      );
      dispatch(
        getAddress({
          provinsi: oneData ? oneData.alamat.provinsi : params?.formData?.provinsi,
          kabupaten: oneData ? oneData.alamat.kabupaten : params?.formData?.kabupaten,
          kecamatan: '',
          scope: 'kecamatan',
        }),
      );
      dispatch(
        getAddress({
          provinsi: oneData ? oneData.alamat.provinsi : params?.formData?.provinsi,
          kabupaten: oneData ? oneData.alamat.kabupaten : params?.formData?.kabupaten,
          kecamatan: oneData ? oneData.alamat.kecamatan : params?.formData?.kecamatan,
          scope: 'kelurahan',
        }),
      );
    }
  }, [isFocus]);
  useEffect(() => {
    dispatch(
      getAddress({
        provinsi: state.formData.provinsi,
        kabupaten: state.formData.kabupaten,
        kecamatan: state.formData.kecamatan,
        scope: state.scope,
      }),
    );
  }, [state.scope]);
  const submitTugas = () => {
    if (state.type == 'view') {
      navigation.goBack();
    } else if (
      state.formData.nama === '' ||
      state.formData.tempatLahir === '' ||
      state.formData.nomorKtp === '' ||
      state.formData.nomorKk === '' ||
      state.formData.npwp === '' ||
      state.formData.bank === '' ||
      state.formData.nomorRekening === '' ||
      state.formData.gaji === '' ||
      state.formData.provinsi === '' ||
      state.formData.kabupaten === '' ||
      state.formData.kecamatan === '' ||
      state.formData.kelurahan === '' ||
      state.formData.kodePos === '' ||
      state.formData.detailAlamat === ''
    ) {
      dispatch(showPopUp({message: 'Please fill all data'}));
    } else if (state.type == 'add') {
      dispatch(addKaryawan(state.formData));
    } else if (state.type == 'edit') {
      dispatch(editKaryawan({id:state.id, ...state.formData}));
    }
  };
  const ubahHandler = (
      field:
        | 'nama'
        | 'tempatLahir'
        | 'tanggalMasuk'
        | 'tanggalLahir'
        | 'nomorKtp'
        | 'nomorKk'
        | 'npwp'
        | 'bank'
        | 'nomorRekening'
        | 'gaji'
        | 'provinsi'
        | 'kabupaten'
        | 'kecamatan'
        | 'kelurahan'
        | 'kodePos'
        | 'detailAlamat',
      nilai: string | Date,
    ) => {
      if (field === 'provinsi') {
        setstate(prev => ({
          ...prev,
          formData: {
            ...prev.formData,
            provinsi: nilai,
            kabupaten: '',
            kecamatan: '',
            kelurahan: '',
            kodePos: '',
          },
          scope: 'kabupaten',
        }));
      } else if (field === 'kabupaten') {
        setstate(prev => ({
          ...prev,
          formData: {
            ...prev.formData,
            kabupaten: nilai,
            kecamatan: '',
            kelurahan: '',
            kodePos: '',
          },
          scope: 'kecamatan',
        }));
      } else if (field === 'kecamatan') {
        setstate(prev => ({
          ...prev,
          formData: {
            ...prev.formData,
            kecamatan: nilai,
            kelurahan: '',
            kodePos: '',
          },
          scope: 'kelurahan',
        }));
      } else if (field === 'kelurahan') {
        const item = kelurahan.find((item: any) => item.kelurahan === nilai);
        setstate(prev => ({
          ...prev,
          formData: {
            ...prev.formData,
            kelurahan: nilai,
            kodePos: item.kode_pos.toString(),
          },
        }));
      } else {
        setstate(prev => ({
          ...prev,
          showDate: false,
          formData: {
            ...prev.formData,
            [field]: nilai,
          },
        }));
      }
    },
    showDateTime = (mode: 'tanggalMasuk' | 'tanggalLahir') => {
      setstate(prev => ({...prev, showDate: true, dateForm: mode}));
    },
    redirMain = () => {
      navigation.navigate('ListData');
    };

  return isLoading ? (
    <Loader />
  ) : isPopedUp ? (
    <PopUpComponent action={redirMain} />
  ) : (
    <MainContainer>
      <ScrollView>
        <Box style={styles.container} padding="l">
          <Text variant="title" textTransform="capitalize" color="primary">
            {params
              ? params.type === 'edit'
                ? ' edit'
                : params.type === 'view'
                ? 'check'
                : ' tambah'
              : 'tambah'}{' '}
            karyawan{' '}
          </Text>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Nama </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="Nama"
                value={oneData ? oneData.nama : state.formData.nama}
                onChangeText={nilai => ubahHandler('nama', nilai)}
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Tempat Lahir </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="Tempat Lahir"
                value={
                  oneData ? oneData.tempatLahir : state.formData.tempatLahir
                }
                onChangeText={nilai => ubahHandler('tempatLahir', nilai)}
              />
            </Box>
          </Box>
          <TouchableOpacity
            onPress={
              oneData === null
                ? () => {
                    showDateTime('tanggalLahir');
                  }
                : () => {}
            }>
            <Box style={styles.formStyle} padding="s">
              <Text variant="smtitle"> Tanggal Lahir </Text>
              <Box alignItems="center">
                <FormTextInput
                  editable={false}
                  styles={styles.formInputStyle}
                  style={{textTransform: 'none'}}
                  value={
                    oneData
                      ? oneData.tanggalLahir.toString().substr(0, 10)
                      : state.formData.tanggalLahir.toISOString().substr(0, 10)
                  }
                />
              </Box>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              oneData === null
                ? () => {
                    showDateTime('tanggalMasuk');
                  }
                : () => {}
            }>
            <Box style={styles.formStyle} padding="s">
              <Text variant="smtitle"> Tanggal Masuk </Text>
              <Box alignItems="center">
                <FormTextInput
                  editable={false}
                  styles={styles.formInputStyle}
                  style={{textTransform: 'none'}}
                  value={
                    oneData
                      ? oneData.tanggalMasuk.toString().substr(0, 10)
                      : state.formData.tanggalMasuk.toISOString().substr(0, 10)
                  }
                />
              </Box>
            </Box>
          </TouchableOpacity>
          {state.showDate && (
            <DateTimePicker
              timeZoneOffsetInMinutes={60 * 7}
              mode="date"
              display="default"
              value={
                oneData
                  ? new Date(oneData[state.dateForm])
                  : state.formData[state.dateForm]
              }
              onChange={(event, selectedDate) =>
                ubahHandler(
                  state.dateForm,
                  selectedDate ? selectedDate : new Date(),
                )
              }
            />
          )}
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> KTP </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="KTP"
                value={
                  oneData
                    ? oneData.personalData.nomorKtp
                    : state.formData.nomorKtp
                }
                onChangeText={nilai => ubahHandler('nomorKtp', nilai)}
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> KK </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="KK"
                value={
                  oneData
                    ? oneData.personalData.nomorKk
                    : state.formData.nomorKk
                }
                onChangeText={nilai => ubahHandler('nomorKk', nilai)}
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> NPWP </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="NPWP"
                value={
                  oneData ? oneData.personalData.npwp : state.formData.npwp
                }
                onChangeText={nilai => ubahHandler('npwp', nilai)}
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Bank </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="Bank"
                value={
                  oneData ? oneData.personalData.bank : state.formData.bank
                }
                onChangeText={nilai => ubahHandler('bank', nilai)}
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Bank Account </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="Bank Account"
                value={
                  oneData
                    ? oneData.personalData.nomorRekening
                    : state.formData.nomorRekening
                }
                onChangeText={nilai => ubahHandler('nomorRekening', nilai)}
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Salary </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="Salary"
                value={
                  oneData ? oneData.personalData.gaji : state.formData.gaji
                }
                onChangeText={nilai => ubahHandler('gaji', nilai)}
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Province </Text>
            <Box alignItems="center">
              <Picker
                style={{...styles.formStyle, color: theme.colors.bgrey}}
                enabled={oneData === null}
                onValueChange={(nilai, _) => ubahHandler('provinsi', nilai)}
                mode="dropdown"
                selectedValue={
                  oneData ? oneData.alamat.provinsi : state.formData.provinsi
                }>
                <Picker.Item value="" label="Province" />
                {provinsi.map((item: any) => {
                  return <Picker.Item key={item} value={item} label={item} />;
                })}
              </Picker>
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Regency </Text>
            <Box alignItems="center">
              <Picker
                style={{...styles.formStyle, color: theme.colors.bgrey}}
                enabled={oneData === null}
                onValueChange={nilai => ubahHandler('kabupaten', nilai)}
                mode="dropdown"
                selectedValue={
                  oneData ? oneData.alamat.kabupaten : state.formData.kabupaten
                }>
                <Picker.Item value="" label="Regency" />
                {kabupaten.map((item: any) => {
                  return <Picker.Item key={item} value={item} label={item} />;
                })}
              </Picker>
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> District </Text>
            <Box alignItems="center">
              <Picker
                style={{...styles.formStyle, color: theme.colors.bgrey}}
                enabled={oneData === null}
                onValueChange={nilai => ubahHandler('kecamatan', nilai)}
                mode="dropdown"
                selectedValue={
                  oneData ? oneData.alamat.kecamatan : state.formData.kecamatan
                }>
                <Picker.Item value="" label="District" />
                {kecamatan.map((item: any) => {
                  return <Picker.Item key={item} value={item} label={item} />;
                })}
              </Picker>
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Sub-District </Text>
            <Box alignItems="center">
              <Picker
                style={{...styles.formStyle, color: theme.colors.bgrey}}
                enabled={oneData === null}
                onValueChange={nilai => ubahHandler('kelurahan', nilai)}
                mode="dropdown"
                selectedValue={
                  oneData ? oneData.alamat.kelurahan : state.formData.kelurahan
                }>
                <Picker.Item
                  value=""
                  label="Sub-District"
                  color={theme.colors.black}
                />
                {kelurahan.map((item: any) => {
                  return (
                    <Picker.Item
                      color={theme.colors.black}
                      key={item.kelurahan}
                      value={item.kelurahan}
                      label={item.kelurahan}
                    />
                  );
                })}
              </Picker>
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Postal Code </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={false}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="Postal Code"
                value={
                  oneData
                    ? oneData.alamat.kodePos.toString()
                    : state.formData.kodePos
                }
              />
            </Box>
          </Box>
          <Box style={styles.formStyle} padding="s">
            <Text variant="smtitle"> Address Detail </Text>
            <Box alignItems="center">
              <FormTextInput
                editable={state.type === 'edit' || state.type === 'add'}
                styles={styles.formInputStyle}
                style={{textTransform: 'none'}}
                placeholder="Address Detail"
                value={
                  oneData
                    ? oneData.alamat.detailAlamat
                    : state.formData.detailAlamat
                }
                onChangeText={nilai => ubahHandler('detailAlamat', nilai)}
              />
            </Box>
          </Box>
          <Button
            variant="primary"
            label={
              params
                ? params.type === 'edit'
                  ? 'Save'
                  : params.type === 'view'
                  ? 'Back'
                  : 'Submit'
                : 'Submit'
            }
            style={{width: Size.ws(80), marginTop: Size.hs(5)}}
            onPress={submitTugas}
          />
        </Box>
      </ScrollView>
    </MainContainer>
  );
};

export default TambahTarget;

const styles = StyleSheet.create({
  container: {
    minHeight: Size.hs(100),
    alignItems: 'center',
  },
  formStyle: {
    justifyContent: 'center',
    width: Size.ws(85),
  },
  formInputStyle: {
    maxWidth: Size.ws(83),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
