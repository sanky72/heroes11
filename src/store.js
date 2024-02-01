import { configureStore } from "@reduxjs/toolkit";
import { positions, transitions } from "react-alert";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

import { matchReducer } from "./reducers/matchReducer";
import { toastReducer } from "./reducers/toastReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
  match: matchReducer,
  toast: toastReducer,
});

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware,
});
window.store = store;
export default store;
