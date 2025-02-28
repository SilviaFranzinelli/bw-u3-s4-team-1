import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducers from "../reducers/profileReducers";
import multiProfilesReducer from "../reducers/multiProfileReducers";
import getExperiencesReducers from "../reducers/experiencesReducers";
import postSlice from "../reducers/postSlice"; // Import del reducer dei post
import postReducer from "../reducers/newPost";
import jobReducer from "../reducers/jobSlice"; // Aggiornato per il nuovo nome del file
import commentsReducer from "../reducers/commentReducer";


const rootReducer = combineReducers({
  profile: profileReducers,
  multiProfiles: multiProfilesReducer,
  experience: getExperiencesReducers,
  posts: postSlice, // Aggiunto il reducer dei post
  myPost: postReducer,
  jobs: jobReducer, // Aggiunto il reducer dei lavori
  comment:commentsReducer
});

const store = configureStore({
  reducer: rootReducer,
});

console.log("\uD83D\uDEE0️ Redux Store Creato:", store.getState());

export default store;
