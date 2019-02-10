import * as actionTypes from "../actions/actionTypes";

interface InitialStateInterface {
  createSnakeLoading: boolean;
  createSnakeError: string;
}
const initialState: InitialStateInterface = {
  createSnakeLoading: false,
  createSnakeError: ""
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
    default:
      return state;
  }
};

export default reducer;
