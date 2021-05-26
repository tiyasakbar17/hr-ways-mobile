import {iRender, reducerAction} from '../../components/global/types/interfaces';
import {LOAD_LOCAL_TASK, SET_TASK} from '../../components/global/types/Types';

export const taskInnitialState: iRender[] = [];

const Task: (state: iRender[], props: reducerAction) => iRender[] = (
  state = taskInnitialState,
  {type, payload},
) => {
  switch (type) {
    case SET_TASK:
      return payload;
    case LOAD_LOCAL_TASK:
      return payload;
    default:
      return state;
  }
};

export default Task;
