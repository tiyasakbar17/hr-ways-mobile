import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../components/global/components/Loader';
import MainContainer from '../components/global/components/MainContainer';
import Button from '../components/global/components/Button';
import {Box, Text} from '../components/global/types/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/global/types/reduxHooks';
import FormTextInput from '../components/global/components/FormTextInput';
import {Size} from '../components/global/types/Sizing';
import {loadData, logout, userLogin} from '../redux/actions/Auth';
import {karyawanByKtp, resetKaryawanByKtp} from '../redux/actions/Karyawan';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import SetAuthToken from '../redux/actions/setAuthToken';
import PopUpComponent from '../components/global/components/PopUpComponent';
import {showPopUp} from '../redux/actions/popUpActions';
import { logo } from '../assets/images';

type SharedStackParams = {
  Main: undefined;
  Edit: any;
  Login: any;
};

interface Props {
  navigation: StackNavigationProp<SharedStackParams>;
  karyawanByKtp: any;
}

const Login = ({navigation, karyawanByKtp}: Props) => {
  const {isLoading, isPopedUp} = useAppSelector(state => state.popup);
  const initialState: {
    username: any;
    password: any;
    type: string;
    ktp: string;
  } = {
    username: '',
    password: '',
    type: 'login',
    ktp: '',
  };
  const [state, setstate] = useState(initialState);
  const dispatch = useAppDispatch();
  const Auth = useAppSelector(state => state.Auth);

  const firstLoad = async () => {
    if (await AsyncStorage.getItem('token')) {
      SetAuthToken(AsyncStorage.getItem('token'));
      dispatch(loadData());
    }
  };
  useEffect(() => {
    Auth.isLogin
      ? Auth.userData.role === 'cabang'
        ? navigation.navigate('Main')
        : dispatch(logout())
      : null;
    Auth.isLogin
      ? Auth.userData.role === 'cabang'
        ? null
        : dispatch(showPopUp({message: 'Please Use Website for Admin'}))
      : firstLoad();
  }, [Auth.isLogin]);

  const submitTugas = async () => {
    dispatch(resetKaryawanByKtp());
    if ((state.username != '' && state.password != '') || state.ktp != '') {
      if (state.type === 'login') {
        dispatch(
          userLogin({
            username: state.username,
            password: state.password,
          }),
        );
      } else {
        const response = await karyawanByKtp(state.ktp);
        setstate(initialState);
        if (response === true) {
          navigation.navigate('Edit',{type:'view'});
        }
      }
    }
    setstate(prev => ({...prev, username: '', password: ''}));
  };

  const ubahHandler = (
    field: 'username' | 'password' | 'type' | 'ktp',
    nilai: string,
  ) =>
    setstate(prev => ({
      ...prev,
      [field]: nilai,
    }));

  const changeType = (type: 'login' | 'check') =>
    setstate(prev => ({...prev, type}));

  return isLoading ? (
    <Loader />
  ) : isPopedUp ? (
    <PopUpComponent />
  ) : (
    <MainContainer>
      <ScrollView>
        <Box style={styles.container} padding="l">
          <Box borderRadius="l" style={styles.imageBox} alignItems='center'>
            <Image
              style={{resizeMode: 'contain'}}
              source={logo}
            />
          </Box>
          {state.type === 'login' ? (
            <>
              <Box style={styles.formStyle} padding="s">
                <Text variant="smtitle">Username</Text>
                <Box alignItems="center">
                  <FormTextInput
                    styles={styles.formInputStyle}
                    style={{textTransform: 'none'}}
                    placeholder="Username"
                    value={state.username}
                    onChangeText={nilai => ubahHandler('username', nilai)}
                  />
                </Box>
              </Box>
              <Box style={styles.formStyle} padding="s">
                <Text variant="smtitle">Password</Text>
                <Box alignItems="center">
                  <FormTextInput
                    secureTextEntry
                    styles={styles.formInputStyle}
                    style={{textTransform: 'none'}}
                    placeholder="Password"
                    value={state.password}
                    onChangeText={nilai => ubahHandler('password', nilai)}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <Box style={styles.formStyle} padding="s">
              <Text variant="smtitle">KTP</Text>
              <Box alignItems="center">
                <FormTextInput
                  styles={styles.formInputStyle}
                  style={{textTransform: 'none'}}
                  placeholder="KTP"
                  value={state.ktp}
                  onChangeText={nilai => ubahHandler('ktp', nilai)}
                />
              </Box>
            </Box>
          )}
          <Button
            variant="primary"
            label={state.type === 'login' ? ' Login ' : ' Check Data '}
            style={{width: Size.ws(80), marginTop: Size.hs(5)}}
            onPress={submitTugas}
          />
          <Button
            variant="secondary"
            label={state.type === 'login' ? ' Check Data ' : ' Login '}
            style={{width: Size.ws(60), marginTop: Size.hs(0.5)}}
            onPress={() =>
              changeType(state.type === 'login' ? 'check' : 'login')
            }
          />
        </Box>
      </ScrollView>
    </MainContainer>
  );
};

export default connect(null, {karyawanByKtp})(Login);

const styles = StyleSheet.create({
  container: {
    minHeight: Size.hs(100),
    alignItems: 'center',
  },
  imageBox: {
    justifyContent: 'center',
    width: Size.ws(85),
    height: Size.hs(40),
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
