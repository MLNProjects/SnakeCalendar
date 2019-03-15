import * as actionTypes from "../actions/actionTypes";

interface InitialStateInterface {
  token: string;
  userId: string;
  error: string;
  loading: boolean;
  username: string;
}

const initialState: InitialStateInterface = {
  token: "",
  userId: "",
  error: "",
  loading: false,
  username: ""
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
    loading: false,
    error: action.error
  });
};

const updateProfile = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    username: action.displayName
  });
};

const authLogout = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    token: "",
    userId: "",
    username: ""
  });
};

const clearAuthFail = (state: InitialStateInterface, action: any) => {
  return Object.assign({}, state, {
    error: ""
  });
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.UPDATE_PROFILE:
      return updateProfile(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.CLEAR_AUTH_FAIL:
      return clearAuthFail(state, action);
    default:
      return state;
  }
};

export default reducer;
