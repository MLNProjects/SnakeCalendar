import * as actionTypes from "../actions/actionTypes";

interface InitialStateInterface {
  createSnakeLoading: boolean;
  createSnakeError: string;
  getSnakesLoading: boolean;
  snakes: Array<Object>;
  getOneSnakeLoading: boolean;
  oneSnake: any;
}
const initialState: InitialStateInterface = {
  createSnakeLoading: false,
  createSnakeError: "",
  getSnakesLoading: false,
  snakes: [],
  getOneSnakeLoading: false,
  oneSnake: {}
};

const createSnakeStart = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    createSnakeLoading: true
  });
};

const createSnakeSuccess = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    createSnakeLoading: false,
    createSnakeError: ""
  });
};

const createSnakeFail = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    createSnakeLoading: false,
    createSnakeError: action.error
  });
};

const createSnakeRemoveError = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    createSnakeError: ""
  });
};

const getSnakesStart = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    getSnakesLoading: true
  });
};

const getSnakesSuccess = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    snakes: action.snakes,
    getSnakesLoading: false
  });
};

const getOneSnakeStart = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    getOneSnakeLoading: true
  });
};

const getOneSnakeSuccess = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    oneSnake: action.snake,
    getOneSnakeLoading: false
  });
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.CREATE_SNAKE_START:
      return createSnakeStart(state, action);
    case actionTypes.CREATE_SNAKE_SUCCESS:
      return createSnakeSuccess(state, action);
    case actionTypes.CREATE_SNAKE_FAIL:
      return createSnakeFail(state, action);
    case actionTypes.CREATE_SNAKE_REMOVE_ERROR:
      return createSnakeRemoveError(state, action);
    case actionTypes.GET_SNAKES_START:
      return getSnakesStart(state, action);
    case actionTypes.GET_SNAKES_SUCCESS:
      return getSnakesSuccess(state, action);
    case actionTypes.GET_ONE_SNAKE_START:
      return getOneSnakeStart(state, action);
    case actionTypes.GET_ONE_SNAKE_SUCCESS:
      return getOneSnakeSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
