import * as actionTypes from "../actions/actionTypes";

interface InitialStateInterface {
  getOneSnakeLoading: boolean;
  oneSnake: any;
  logDateLoading: boolean;
  deleteSnakeLoading: boolean;
}

const initialState: InitialStateInterface = {
  getOneSnakeLoading: false,
  oneSnake: {},
  logDateLoading: false,
  deleteSnakeLoading: false
};

const getOneSnakeStart = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    getOneSnakeLoading: true,
    oneSnake: {}
  });
};

const getOneSnakeSuccess = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    oneSnake: action.snake,
    getOneSnakeLoading: false
  });
};

const logDateStart = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    logDateLoading: true
  });
};

const logDateSuccess = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    logDateLoading: false
  });
};

const deleteSnakeStart = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    deleteSnakeLoading: true
  });
};

const deleteSnakeSuccess = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    deleteSnakeLoading: false
  });
};

const addLogToSnake = (state: InitialStateInterface, action: any) => {
  const newSnake = { ...state.oneSnake.dateLog };
  newSnake[action.dateNow] = { comment: action.comment };
  return Object.assign({}, state, {
    oneSnake: { ...state.oneSnake, dateLog: newSnake }
  });
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_ONE_SNAKE_START:
      return getOneSnakeStart(state, action);
    case actionTypes.GET_ONE_SNAKE_SUCCESS:
      return getOneSnakeSuccess(state, action);
    case actionTypes.LOG_DATE_START:
      return logDateStart(state, action);
    case actionTypes.LOG_DATE_SUCCESS:
      return logDateSuccess(state, action);
    case actionTypes.DELETE_SNAKE_START:
      return deleteSnakeStart(state, action);
    case actionTypes.DELETE_SNAKE_SUCCESS:
      return deleteSnakeSuccess(state, action);
    case actionTypes.ADD_LOG_TO_SNAKE:
      return addLogToSnake(state, action);
    default:
      return state;
  }
};

export default reducer;
