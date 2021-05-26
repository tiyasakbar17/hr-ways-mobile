import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {closePopUp} from '../../../redux/actions/popUpActions';
import {useAppDispatch, useAppSelector} from '../types/reduxHooks';
import {Size} from '../types/Sizing';
import theme, {Box, Text} from '../types/theme';
import Button from './Button';

interface Props {
  action?: () => void;
}

const PopUpComponent = ({action}: Props) => {
  const {message, redir} = useAppSelector(state => state.popup);
  const dispatch = useAppDispatch();
  const closePop = () => {
    redir && action !== undefined && action();
    dispatch(closePopUp);
  };
  return (
    <Box style={styles.main}>
      <TouchableWithoutFeedback onPress={closePop}>
        <Box style={styles.closer}></Box>
      </TouchableWithoutFeedback>
      <Box style={styles.containter}>
        <Text variant="smtitle" style={styles.text}>
          {message}
        </Text>
        <Button
          variant="secondary"
          onPress={closePop}
          label="OK"
          style={styles.button}
        />
      </Box>
    </Box>
  );
};

export default PopUpComponent;

const styles = StyleSheet.create({
  button: {
    marginTop: Size.hs(4),
  },
  closer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: Size.ws(100),
    height: Size.hs(100),
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: Size.ws(100),
    height: Size.hs(100),
    zIndex: 99,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containter: {
    width: Size.ws(80),
    minHeight: Size.hs(25),
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'white',
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
