import { createStore } from "redux";
import Logger from "../helpers/Logger";

interface InitialStateInterface {
  loggedIn: boolean;
  loggedInUser: string;
}

// const initialState: InitialStateInterface = {};
const initialState: InitialStateInterface = {
  loggedIn: false,
  loggedInUser: ""
};

function myReducer(state = initialState, action: any) {
  switch (action.type) {
    case "LOG_IN":
      return Object.assign({}, state, {
        loggedIn: true,
        loggedInUser: action.username
      });
    case "LOG_OUT":
      return Object.assign({}, state, {
        loggedIn: false,
        loggedInUser: ""
      });
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(myReducer, initialState);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => Logger.stateChange(store.getState()));
export default store;
