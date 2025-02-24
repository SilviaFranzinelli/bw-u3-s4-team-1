import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducers from "../reducers/profileReducers";
import multiProfilesReducer from "../reducers/multiProfileReducers";

const rootReducer = combineReducers({
  profile: profileReducers,
  multiProfiles: multiProfilesReducer,
});
const store = configureStore({
    reducer:rootReducer,
});

console.log("🛠️ Redux Store Creato:", store.getState());

export default store;
