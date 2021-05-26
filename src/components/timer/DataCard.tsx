import React from 'react';
import theme, {Box, Text} from '../global/types/theme';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Size} from '../global/types/Sizing';
import {funcType} from '../global/types/interfaces';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TugasProps {
  item: any;
  viewHandler: funcType;
  deleteHandler: funcType;
  editHandler: funcType;
  restore: boolean;
  restoreHandler: funcType
}

const DataCard: React.FunctionComponent<TugasProps> = ({
  item,
  viewHandler,
  deleteHandler,
  editHandler,
  restoreHandler,
  restore
}) => {
  return (
    <Box
      padding="xs"
      backgroundColor="white"
      style={styles.boxTugas}
      borderRadius="s"
      marginBottom="s">
      <Box flexGrow={1} justifyContent="center" alignItems="center">
        <TouchableOpacity onPress={() => viewHandler(item.id)}>
          <MaterialCommunityIcon
            name="eye-circle"
            color={theme.colors.grey}
            size={Size.ws(8)}
          />
        </TouchableOpacity>
      </Box>
      <Box flexGrow={8.5} justifyContent="center">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Text
            fontWeight="bold"
            color="primary"
            textTransform="capitalize"
            textDecorationLine={item.waktuSelesai ? 'line-through' : 'none'}
            style={{
              textDecorationColor: 'rgb(74,89,151)',
            }}>
            {item.nama}
          </Text>
          <Box flexDirection="row-reverse">
            {
              restore ? <TouchableOpacity
              onPress={() => restoreHandler(item.id)}
              style={{marginHorizontal: 4}}>
              <MaterialCommunityIcon
                name="recycle"
                color={theme.colors.grey}
                size={Size.ws(6)}
              />
            </TouchableOpacity> : <><TouchableOpacity
              onPress={() => deleteHandler(item.id)}
              style={{marginHorizontal: 4}}>
              <MaterialCommunityIcon
                name="delete-circle"
                color={theme.colors.grey}
                size={Size.ws(6)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editHandler(item.id)}>
              <MaterialCommunityIcon
                name="pencil-circle"
                color={theme.colors.grey}
                size={Size.ws(6)}
              />
            </TouchableOpacity></>
            }
            
          </Box>
        </Box>
        <Box marginLeft="m">
            <Box
              padding="s"
              style={{
                ...styles.catatanBox,
                backgroundColor: 'rgba(74,89,151, 0.4)',
              }}>
              <Text fontWeight="900" color="sgrey" textTransform='capitalize'>
                Cabang: {item.cabang.namaCabang}
              </Text>
              <Text fontWeight="900" color="sgrey">
                Gaji: Rp. {item.personalData.gaji}
              </Text>
            </Box>
          </Box>
      </Box>
    </Box>
  );
};

export default DataCard;

const styles = StyleSheet.create({
  boxTugas: {
    width: Size.ws(90),
    minHeight: Size.hs(5),
    flexDirection: 'row',
  },
  catatanBox: {
    maxWidth: Size.ws(75),
  },
});
