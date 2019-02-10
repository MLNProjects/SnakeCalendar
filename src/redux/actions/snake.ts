import * as actionTypes from "./actionTypes";
import snakeClient from "../../http/snakes";

const createSnakeStart = () => {
  return {
    type: actionTypes.CREATE_SNAKE_START
  };
};

const createSnakeSuccess = () => {
  return {
    type: actionTypes.CREATE_SNAKE_SUCCESS
  };
};

const createSnakeFail = (error: string) => {
  return {
    type: actionTypes.CREATE_SNAKE_FAIL,
    error
  };
};

export const createSnakeRemoveError = () => {
  return {
    type: actionTypes.CREATE_SNAKE_REMOVE_ERROR
  };
};

export const createSnake = (
  token: string,
  userId: string,
  snakeName: string
) => {
  return (dispatch: any) => {
    dispatch(createSnakeStart());
    snakeClient
      .create(token, userId, snakeName)
      .then(res => {
        dispatch(createSnakeSuccess());
      })
      .catch(err => {
        dispatch(createSnakeFail(err.response.data.error));
      });
  };
};
