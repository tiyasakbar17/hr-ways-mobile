import React from 'react';
import {StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import theme, {Text} from '../types/theme';

interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'white' | 'sgrey';
  label?: string;
  onPress?: (props: any) => void;
  textTransform?: any;
  style?: any;
  txtColor?: 'primary' | 'kuartet' | 'danger' | 'white';
}

const Button = ({
  variant,
  label,
  onPress,
  textTransform,
  style,
  txtColor,
}: ButtonProps) => {
  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
      ? theme.colors.kuartet
      : variant === 'white'
      ? theme.colors.white
      : variant === 'sgrey'
      ? theme.colors.sgrey
      : theme.colors.grey;
  const color = txtColor
    ? theme.colors[txtColor]
    : variant === 'white'
    ? theme.colors.black
    : theme.colors.textWhite;

  return (
    <RectButton
      {...{onPress}}
      style={{...styles.container, backgroundColor, ...style}}>
      <Text
        style={{color, fontFamily: 'Rubik-Bold'}}
        textTransform={textTransform ? textTransform : 'capitalize'}
        variant="button">
        {label}
      </Text>
    </RectButton>
  );
};

Button.defaultProps = {variant: 'default'};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
