import { combineReducers, configureStore } from "@reduxjs/toolkit";
import receiverReducer from "./features/spedition/receiver";
import econtReducer from "./features/spedition/econt";

const rootReducer = combineReducers({
  receiver: receiverReducer,
  econt: econtReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
  });

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
