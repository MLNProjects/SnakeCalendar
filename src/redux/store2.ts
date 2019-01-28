import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./reducers/auth";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;