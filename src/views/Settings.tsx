import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Switch} from 'react-native';
import Button from '../components/global/components/Button';
import MainContainer from '../components/global/components/MainContainer';
import {iUpdateSetting} from '../components/global/types/interfaces';
import {
  useAppDispatch,
  useAppSelector,
} from '../components/global/types/reduxHooks';
import {Size} from '../components/global/types/Sizing';
import {Box, Text} from '../components/global/types/theme';
import {logout} from '../redux/actions/Auth';
import {ubahPengaturan} from '../redux/actions/settingActions';
import {settingInitState} from '../redux/reducers/settingReducer';

type SharedStackParams = {
  Main: undefined;
  Edit: any;
  Login: any;
};

interface Props {
  navigation: StackNavigationProp<SharedStackParams>;
}

const Settings = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const setting: settingInitState = useAppSelector(state => state.settings);
  const Auth = useAppSelector(state => state.Auth);

  useEffect(() => {
    Auth.isLogin === false ? navigation.navigate('Login') : null;
  }, [Auth.isLogin]);

  const {darkMode} = setting;
  const onValueChange = ({
    tipe,
    nilai,
  }: {
    tipe: iUpdateSetting['tipe'];
    nilai?: string;
  }) => {
    dispatch(ubahPengaturan({tipe, nilai: nilai ? 0 : 1}));
  };
  return (
    <MainContainer>
      <Box padding="m" alignItems="center" minHeight={Size.hw(100)}>
        <Text variant="title" color="grey" marginBottom="m">
          Pengaturan
        </Text>
        <Box style={styles.itemBox} marginBottom="s">
          <Text variant="smtitle">Mode Gelap</Text>
          <Switch
            value={darkMode}
            onValueChange={() => onValueChange({tipe: 'darkMode'})}
          />
        </Box>
        <Button
          variant="primary"
          label={'Logout'}
          style={{width: Size.ws(80), marginTop: Size.hs(5)}}
          onPress={() => dispatch(logout())}
        />
      </Box>
    </MainContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  inputStyle: {
    width: Size.ws(15),
    height: Size.hs(5),
    alignContent: 'center',
    padding: 0,
  },
  inputmain: {
    textAlign: 'center',
    padding: 0,
  },
  itemBox: {
    flexDirection: 'row',
    width: Size.ws(85),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderBox: {
    width: Size.ws(85),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
