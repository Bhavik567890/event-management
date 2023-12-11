import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootreducer";
import persistReducer from "redux-persist/es/persistReducer";
import  storage  from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";



const rootPersistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)