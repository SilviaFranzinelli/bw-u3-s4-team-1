import { configureStore, combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../reducers/profile";

const rootReducers = combineReducers({
    profiles:profileReducer,
})

// 📌 Configurazione dello store Redux
const store = configureStore({
    reducer: rootReducers
})

console.log(store.getState());

export default store;
