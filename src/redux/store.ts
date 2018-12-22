import { createStore } from "redux";

interface PersonInterface {
  name?: string;
  age?: number;
  gender?: string;
}

interface InitialStateInterface {
  person?: PersonInterface
}

// const initialState: InitialStateInterface = {};
const initialState: PersonInterface = {};


function myReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'CHANGE_NAME':
      console.log("Changing name");
      return Object.assign({}, state, {
        name: action.name
      })
    case 'DELETE_NAME':
      return Object.assign({}, state, {
        name: ""
      })
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(myReducer, initialState)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log(store.getState()))
export default store;
