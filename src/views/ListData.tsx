import { StackNavigationProp } from '@react-navigation/stack';
import { Spinner } from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../components/global/types/reduxHooks';
import {Size} from '../components/global/types/Sizing';
import theme, {Box, Text} from '../components/global/types/theme';
import DataCard from '../components/timer/DataCard';
import HeaderList from '../components/timer/HeaderList';
import { deleteKaryawan, getKaryawan, restoreKaryawan } from '../redux/actions/Karyawan';
import {settingInitState} from '../redux/reducers/settingReducer';

interface initState {
  keyword: string,
  restore: boolean,
}
interface Props {
  navigation: StackNavigationProp<any>
}

const ListData = ({navigation}: Props) => {
  const initialState: initState = {
    keyword: '',
    restore: false
  };
  const [state, setstate] = React.useState<initState>(initialState);
  const dispatch = useAppDispatch()
  const {darkMode}: settingInitState = useAppSelector(state => state.settings);
  const {isLoading} = useAppSelector(state => state.popup);
  const {data, totalPage, pageNow} = useAppSelector(state => state.Karyawan);

  const findUserToHandle = (id: number) => {
    const calledId = data.find((item: any) => item.id === id)
    const {nama, tempatLahir, tanggalLahir, tanggalMasuk, alamat: {provinsi, kabupaten, kecamatan, kelurahan, kodePos, detailAlamat}, personalData: {nomorKtp, nomorKk, npwp, bank, nomorRekening, gaji}} = calledId;
    return {
      nama, tempatLahir, tanggalLahir, tanggalMasuk, provinsi, kabupaten, kecamatan, kelurahan, kodePos: kodePos.toString(), detailAlamat, nomorKtp, nomorKk, npwp, bank, nomorRekening, gaji
    }
  },viewHandler = (id: number) => {
    const operData = findUserToHandle(id);
    navigation.navigate('Edit',{type:'view', formData: operData})
  },deleteHandler = (id: number) => {
    dispatch(deleteKaryawan(id, state.keyword))
  },restoreHandler = (id: number) => {
    dispatch(restoreKaryawan(id, state.keyword))
  },
  editHandler = (id: number) => {
    const operData = findUserToHandle(id);
    navigation.navigate('Edit',{type:'edit', formData: operData, id})
  },nextPage = () => 
    pageNow < totalPage && (isLoading === false) && dispatch(getKaryawan({page: pageNow + 1, keyword: state.keyword, restore:state.restore}))
  ,listFooter = () => {
    return isLoading ? <Box justifyContent='center' alignItems='center' marginBottom='l'><Spinner size='small' color={theme.colors.white} /></Box> : <Box justifyContent='center' alignItems='center' marginBottom='l'><Text color='white'>{' '}-{' '}</Text></Box>
  },
  changeHandler = ({field, nilai} : {field: string, nilai?: any}) => {
    setstate(prev => ({...prev, [field] : nilai}))
  }
  React.useEffect(()=>{
    dispatch(getKaryawan({page:1, restore:state.restore, keyword:state.keyword}))
  },[state])
  
  const renderItem = React.useCallback(
    ({item}) => (
      <DataCard
        {...{
          item,
          viewHandler,
          deleteHandler,
          editHandler,
          restore: state.restore,
          restoreHandler
        }}
      />
    ),
    [ data],
  );

  return (
    <Box
      backgroundColor="primary"
      alignItems="center"
      paddingHorizontal="s"
      paddingVertical="s"
      minHeight={Size.hs(100)}>
      <Text
        color={darkMode ? 'sgrey' : 'textWhite'}
        marginTop="s"
        marginBottom="l"
        fontSize={Size.ws(10)}
        variant="title">
        {' '}
        HR Ways{' '}
      </Text>
      <HeaderList restore={state.restore} restoreHandler={changeHandler} />
      <FlatList data={data} keyExtractor={item => item.id} renderItem={renderItem} ListFooterComponent={listFooter}  onEndReached={nextPage} onEndReachedThreshold={0.01} />
    </Box>
  );
};

export default ListData;

const styles = StyleSheet.create({});
