import {reducerAction} from '../../components/global/types/interfaces';
import {
  LOAD_LOCAL_SETTING,
  SET_MODE,
} from '../../components/global/types/Types';


export interface settingInitState {
  darkMode: boolean;
}

export const settingInnitialState: settingInitState = {
  darkMode: false,
};

const Setting: (
  state: settingInitState,
  props: reducerAction,
) => settingInitState = (state = settingInnitialState, {type, payload}) => {
  switch (type) {
    case LOAD_LOCAL_SETTING:
      return payload;
    case SET_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default Setting;
