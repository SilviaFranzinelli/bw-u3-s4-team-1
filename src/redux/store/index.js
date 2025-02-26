import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducers from "../reducers/profileReducers";
import multiProfilesReducer from "../reducers/multiProfileReducers";
import getExperiencesReducers from "../reducers/experiencesReducers";
import postSlice from "../reducers/postSlice"; // Import del reducer dei post

const rootReducer = combineReducers({
  profile: profileReducers,
  multiProfiles: multiProfilesReducer,
  experience: getExperiencesReducers,
  posts: postSlice, // Aggiunto il reducer dei post
});

const store = configureStore({
  reducer: rootReducer,
});

console.log("\uD83D\uDEE0️ Redux Store Creato:", store.getState());

export default store;
