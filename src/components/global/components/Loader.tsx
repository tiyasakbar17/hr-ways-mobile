import React from 'react';
import {StyleSheet} from 'react-native';
import theme, {Box} from '../types/theme';
import {Spinner} from 'native-base';

interface Props {
  color?: string;
}

export default function Loader({color}: Props) {
  return (
    <Box
      flex={1}
      backgroundColor={color ? color : 'primary'}
      justifyContent="center"
      alignItems="center"
      style={{...StyleSheet.absoluteFillObject}}>
      <Spinner color={theme.colors.white} />
    </Box>
  );
}
