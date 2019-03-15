import * as actionTypes from "./actionTypes";
import authClient from "../../http/auth";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (token: string, userId: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId
  };
};

const authFail = (error: string) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};
export const clearAuthFail = () => {
  return {
    type: actionTypes.CLEAR_AUTH_FAIL
  };
};

const updateProfile = (displayName: string) => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    displayName
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

const setToLocalStorage = (
  idToken: string,
  expirationTime: number,
  userId: string,
  username: string
) => {
  const expirationDate = new Date(new Date().getTime() + expirationTime * 1000);
  localStorage.setItem("token", idToken);
  localStorage.setItem("expirationDate", expirationDate.toString());
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
};

export const signIn = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(authStart());
    authClient
      .login(email, password)
      .then(res => {
        authClient
          .getProfile(res.data.idToken)
          .then(res2 => {
            dispatch(updateProfile(res2.data.users[0].displayName));
            setToLocalStorage(
              res.data.idToken,
              res.data.expiresIn,
              res.data.localId,
              res2.data.users[0].displayName
            );
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
          })
          .catch();
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const signUp = (email: string, password: string, userName: string) => {
  return (dispatch: any) => {
    dispatch(authStart());
    authClient
      .signUp(email, password)
      .then(res => {
        authClient
          .updateProfile(res.data.idToken, userName)
          .then(res2 => {
            dispatch(updateProfile(res2.data.displayName));
            setToLocalStorage(
              res.data.idToken,
              res.data.expiresIn,
              res.data.localId,
              userName
            );
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
          })
          .catch();
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error.message));
      });
  };
};

export const checkLocalState = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("expirationDate") || ""
      );
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        dispatch(updateProfile(username || ""));
        dispatch(authSuccess(token || "", userId || ""));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
