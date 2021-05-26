import {Switch} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import TextInput from '../global/components/TextInput';
import {funcType} from '../global/types/interfaces';
import {Size} from '../global/types/Sizing';
import theme, {Box, Text} from '../global/types/theme';

interface Props {
  restore: boolean;
  restoreHandler: funcType;
}

const HeaderList = ({restore, restoreHandler}: Props) => {
  return (
    <Box style={styles.headerContainer}>
      <Box alignItems="center" marginBottom='s'>
        <TextInput styles={styles.findKeyword} placeholder='Karyawan Name' onChangeText={(nilai) => restoreHandler({field: 'keyword', nilai})} />
      </Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Text
          variant="smtitle"
          fontSize={Size.ws(5)}
          color="white"
          marginBottom="xs">
          {restore && 'Deleted '}Karyawan
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Text variant="body" color="white" marginRight="s">
            Deleted Data
          </Text>
          <Switch
            value={restore}
            onValueChange={value =>
              restoreHandler({field: 'restore', nilai: value})
            }
          />
        </Box>
      </Box>
      <Box
        width={Size.ws(90)}
        backgroundColor="white"
        borderRadius="l"
        height={Size.hs(0.4)}
      />
    </Box>
  );
};

export default HeaderList;

const styles = StyleSheet.create({
  headerContainer: {
    width: Size.ws(90),
    justifyContent: 'space-around',
    marginBottom: Size.hs(0.5),
  },
  findKeyword: {
    height: 40,
    backgroundColor:theme.colors.white
  },
});
