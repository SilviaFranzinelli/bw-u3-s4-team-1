import { configureStore, combineReducers } from "@reduxjs/toolkit";

// 📌 Reducer vuoto temporaneo per evitare errori
const rootReducer = combineReducers({
  placeholder: (state = {}) => state, // 🔴 Questo è un reducer temporaneo
});

// 📌 Configurazione dello store Redux
const store = configureStore({
  reducer: rootReducer,
});

console.log("🛠️ Redux Store Creato:", store.getState());

export default store;
