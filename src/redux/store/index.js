import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducers from "../reducers/profileReducers";
import multiProfilesReducer from "../reducers/multiProfileReducers";
import experienceReducer from "../reducers/experienceSlice"; // Import del reducer delle esperienze

const rootReducer = combineReducers({
  profile: profileReducers,
  multiProfiles: multiProfilesReducer,
  experience: experienceReducer, // Aggiunto il reducer delle esperienze
});

const store = configureStore({
  reducer: rootReducer,
});

console.log("🛠️ Redux Store Creato:", store.getState());

export default store;
