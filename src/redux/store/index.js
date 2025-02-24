import { configureStore } from "@reduxjs/toolkit";
import profileReducers from "../reducers/profileReducers";

// 📌 Reducer vuoto temporaneo per evitare errori
/* const rootReducer = combineReducers({
  placeholder: (state = {}) => state, // 🔴 Questo è un reducer temporaneo
}); */

const store = configureStore({
  reducer: {
    profile: profileReducers,
  },
});

console.log("🛠️ Redux Store Creato:", store.getState());

export default store;
