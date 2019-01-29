import * as actionTypes from "./actionTypes";
import authClient from "../../http/auth";
import { stat } from "fs";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token: string, userId: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId
  };
};

export const authFail = (error: string) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email: string, password: string, type: string) => {
  return (dispatch: any) => {
    dispatch(authStart());
    authClient
      .signUp(email, password)
      .then(res => {
        authSuccess(res.data.idToken, res.data.localId);
        console.log("SIGNED UP!", res);
      })
      .catch(err => {
        authFail(err.response.data.error);
      });
  };
};
