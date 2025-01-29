import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/counterSlice';
import { persistStore, persistReducer, WebStorage, Persistor } from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

export function createPersistStore():WebStorage{
  const isServer=typeof window ==="undefined";
  if(isServer){
    return{
      getItem(){
        return Promise.resolve(null);
      },
      setItem(){
        return Promise.resolve();
      },
      removeItem(){
        return Promise.resolve();
      },
    }
  }
  return createWebStorage("local")
}

const storage=typeof window !=="undefined" ? createWebStorage("local") : createPersistStore();

const persistConfig = {
  key: 'root',
  version: 1 ,
  storage,
}

const persistedReducer = persistReducer(persistConfig, counterReducer)

export const store = configureStore({
  reducer: {
    counter: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor: Persistor = persistStore(store)