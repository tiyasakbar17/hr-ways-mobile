import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListData from '../views/ListData';
import theme from '../components/global/types/theme';
import Settings from '../views/Settings';
import NavTambahTarget from './NavTambahTarget';
import TambahTarget from '../views/TambahTarget';

export type MainRoutes = {
  ListData: any;
  Tambah: any;
  Pengaturan: any;
};

export const MainStack = createBottomTabNavigator<MainRoutes>();

const MainNavigator = () => (
  <MainStack.Navigator
    initialRouteName="ListData"
    tabBarOptions={{
      activeTintColor: theme.colors.primary,
      inactiveTintColor: theme.colors.kuartet,
      adaptive: true,
      tabStyle: styles.tabstyle,
    }}>
    <MainStack.Screen
      name="ListData"
      options={{
        tabBarLabel: 'Karyawan',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="account-group" color={color} size={size} />
        ),
      }}
      component={ListData}
    />
    <MainStack.Screen
      name="Tambah"
      options={({navigation}) => ({
        tabBarLabel: 'Tambah Karyawan',
        tabBarVisible: false,
        tabBarIcon: ({focused}) => {
          const onPress = () => navigation.navigate('Tambah', null);
          return <NavTambahTarget {...{onPress, focused}} />;
        },
      })}
      component={TambahTarget}
    />
    <MainStack.Screen
      name="Pengaturan"
      options={{
        tabBarLabel: 'Pengaturan',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="cogs" color={color} size={size} />
        ),
      }}
      component={Settings}
    />
  </MainStack.Navigator>
);

export default MainNavigator;

const styles = StyleSheet.create({
  tabstyle: {
    backgroundColor: theme.colors.secondary,
  },
});
