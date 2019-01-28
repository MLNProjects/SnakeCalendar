import * as actionTypes from "./actionTypes";

export const authStart = () => {
  console.log("AUTH_START");
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token: string, userId: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error: string) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
