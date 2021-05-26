import { Dimensions } from 'react-native';

export const Size = {
  ws: (percentage: number) => {
    return Dimensions.get('screen').width * (percentage / 100);
  },
  hs: (percentage: number) => {
    return Dimensions.get('screen').height * (percentage / 100);
  },
  ww: (percentage: number) => {
    return Dimensions.get('window').width * (percentage / 100);
  },
  hw: (percentage: number) => {
    return Dimensions.get('window').height * (percentage / 100);
  },
};
