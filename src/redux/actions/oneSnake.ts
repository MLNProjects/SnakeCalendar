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

const addLogToSnake = (dateNow: number, comment: string) => {
  return {
    type: actionTypes.ADD_LOG_TO_SNAKE,
    dateNow,
    comment
  };
};

export const logDate = (
  token: string,
  userId: string,
  snakeId: string,
  comment: string
) => {
  return (dispatch: any) => {
    const dateNow: number = Date.now();
    dispatch(logDateStart());
    snakeClient
      .logDate(token, userId, snakeId, dateNow, comment)
      .then(res => {
        dispatch(logDateSuccess());
        dispatch(addLogToSnake(dateNow, comment));
      })
      .catch(err => console.log(err));
  };
};

const deleteSnakeStart = () => {
  return {
    type: actionTypes.DELETE_SNAKE_START
  };
};

const deleteSnakeSuccess = () => {
  return {
    type: actionTypes.DELETE_SNAKE_SUCCESS
  };
};

export const deleteSnake = (token: string, userId: string, snakeId: string) => {
  return (dispatch: any) => {
    dispatch(deleteSnakeStart());
    snakeClient
      .deleteSnake(token, userId, snakeId)
      .then((res: any) => {
        dispatch(deleteSnakeSuccess());
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
};

export const deleteSnakeReset = () => {
  return {
    type: actionTypes.DELETE_SNAKE_RESET
  };
};
