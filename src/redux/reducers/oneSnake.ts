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
    default:
      return state;
  }
};

export default reducer;
