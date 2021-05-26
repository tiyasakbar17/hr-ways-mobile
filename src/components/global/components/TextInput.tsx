import React, {forwardRef} from 'react';

import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  Dimensions,
} from 'react-native';

import theme, {Box} from '../types/theme';

const {width} = Dimensions.get('window');

interface TextInputProps extends RNTextInputProps {
  styles?: any;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({styles, ...props}, ref) => {
    return (
      <Box
        flexDirection="row"
        height={54}
        borderRadius="s"
        borderColor="grey"
        borderWidth={StyleSheet.hairlineWidth}
        alignItems="center"
        style={{
          width: width * 0.85,
          paddingHorizontal: 4,
          borderRadius: 16,
          ...styles,
        }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={theme.colors['grey']}
          {...{ref}}
          style={{
            flex: 1,
            fontFamily: 'CircularStdMedium',
            color: theme.colors['grey'],
            fontSize: 15,
          }}
          {...props}
        />
      </Box>
    );
  },
);
export default TextInput;
