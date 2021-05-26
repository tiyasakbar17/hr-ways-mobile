import React from 'react';
import {Box} from '../types/theme';
import {useAppSelector} from '../types/reduxHooks';

//** import redux */

interface Props {
  children?: any;
}

const MainContainer = (props: Props) => {
  const {darkMode} = useAppSelector(state => state.settings);

  return (
    <Box
      backgroundColor={darkMode ? 'darkMode' : 'secondary'}
      alignItems="center">
      {props.children}
    </Box>
  );
};

export default MainContainer;
