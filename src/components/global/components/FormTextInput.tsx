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
  style?: object;
}

const FormTextInput = forwardRef<RNTextInput, TextInputProps>(
  ({styles, style, ...props}, ref) => {
    return (
      <Box
        flexDirection="row"
        borderRadius="s"
        borderColor="grey"
        borderWidth={StyleSheet.hairlineWidth}
        alignItems="center"
        style={{
          width: width * 0.85,
          paddingHorizontal: 4,
          ...styles,
        }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor={theme.colors.grey}
          {...{ref}}
          style={{
            flex: 1,
            fontFamily: 'Rubik-Medium',
            color: theme.colors.grey,
            fontSize: 15,
            textTransform: 'capitalize',
            ...style,
          }}
          {...props}
        />
      </Box>
    );
  },
);
export default FormTextInput;
