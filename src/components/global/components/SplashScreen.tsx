import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {logo} from '../../../assets/images';
import {Box} from '../types/theme';

export default function SplashScreen() {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Box
      flex={1}
      backgroundColor="secondary"
      justifyContent="center"
      alignItems="center"
      style={{...StyleSheet.absoluteFillObject}}>
      <Animated.Image style={{transform: [{rotate: spin}]}} source={logo} />
    </Box>
  );
}
