import {reducerAction} from '../../components/global/types/interfaces';
import {
  CLOSE_POPUP,
  SHOW_POPUP,
  SHOW_LOADING,
} from '../../components/global/types/Types';

interface initState {
  isLoading: boolean;
  isPopedUp: boolean;
  message: string;
  redir: boolean | undefined;
}

export const popUpinitialState: initState = {
  isLoading: true,
  isPopedUp: false,
  message: '',
  redir: false,
};

const PopUp: (state: any, props: reducerAction) => initState = (
  state = popUpinitialState,
  {type, payload},
) => {
  switch (type) {
    case SHOW_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case SHOW_POPUP:
      return {
        ...state,
        isPopedUp: true,
        message: payload.message,
        redir: payload.redir ? payload.redir : false
      };
    case CLOSE_POPUP:
      return {
        ...state,
        isPopedUp: false,
        message: '',
        redir: false
      };
    default:
      return state;
  }
};

export default PopUp;
