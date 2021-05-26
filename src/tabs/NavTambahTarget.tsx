import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {funcType} from '../components/global/types/interfaces';
import theme, {Box} from '../components/global/types/theme';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Size} from '../components/global/types/Sizing';

interface Props {
  onPress: funcType;
  focused: boolean;
}

const NavTambahTarget = ({onPress, focused}: Props) => {
  return (
    <TouchableHighlight
      {...{
        onPress,
        style: {
          ...styles.tombolContainer,
          bottom: focused ? -25 : Size.hs(1.2),
        },
      }}>
      <Box>
        <MaterialCommunityIcon
          name="plus-circle-outline"
          size={Size.ws(15)}
          color={theme.colors.danger}
        />
      </Box>
    </TouchableHighlight>
  );
};

export default NavTambahTarget;

const styles = StyleSheet.create({
  tombolContainer: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.textWhite,
    borderWidth: 10,
    height: Size.ws(20),
    width: Size.ws(20),
    borderRadius: Size.ws(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
