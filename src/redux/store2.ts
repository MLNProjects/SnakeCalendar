import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./reducers/auth";
import snakeReducer from "./reducers/snake";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  snake: snakeReducer
});
const composeEnhancers =
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
