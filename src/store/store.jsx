import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "../services/index";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isDevMode = process.env.NODE_ENV === "development";
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
  devTools: isDevMode, //only show dev tools if we are in development mode
});

export const persistor = persistStore(store);

export default store;
