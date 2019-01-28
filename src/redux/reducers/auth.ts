import * as actionTypes from "../actions/actionTypes";

interface InitialStateInterface {
  token: string;
  userId: string;
  error: string;
  loading: boolean;
}

const initialState: InitialStateInterface = {
  token: "",
  userId: "",
  error: "",
  loading: false
};

const authStart = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    error: "",
    loading: true
  });
};

const authSuccess = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    token: action.idToken,
    userId: action.userId,
    error: "",
    loading: false
  });
};

const authFail = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authFail(state, action);
    default:
      return state;
  }
};

export default reducer;
