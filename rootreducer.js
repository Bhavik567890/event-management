import {  combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./src/modules/users/user-slice";
import eventReducer from "./src/modules/events/event-slice"
const rootReducer = combineReducers({
  user: usersReducer,
  event:eventReducer
});


export default rootReducer;
