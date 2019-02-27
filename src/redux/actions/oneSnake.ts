import * as actionTypes from "./actionTypes";
import snakeClient from "../../http/snakes";

const getOneSnakeStart = () => {
  return {
    type: actionTypes.GET_ONE_SNAKE_START
  };
};

const getOneSnakeSuccess = (snake: Object) => {
  return {
    type: actionTypes.GET_ONE_SNAKE_SUCCESS,
    snake
  };
};

export const getOneSnake = (token: string, userId: string, snakeId: string) => {
  return (dispatch: any) => {
    dispatch(getOneSnakeStart());
    snakeClient
      .getOneSnake(token, userId, snakeId)
      .then(res => {
        dispatch(getOneSnakeSuccess(res.data));
      })
      .catch(err => console.log(err.response));
  };
};

const logDateStart = () => {
  return {
    type: actionTypes.LOG_DATE_START
  };
};

const logDateSuccess = () => {
  return {
    type: actionTypes.LOG_DATE_SUCCESS
  };
};

export const logDate = (
  token: string,
  userId: string,
  snakeId: string,
  comment: string
) => {
  return (dispatch: any) => {
    dispatch(logDateStart());
    snakeClient
      .logDate(token, userId, snakeId, comment)
      .then(res => {
        dispatch(logDateSuccess());
        dispatch(getOneSnake(token, userId, snakeId));
      })
      .catch(err => console.log(err));
  };
};
