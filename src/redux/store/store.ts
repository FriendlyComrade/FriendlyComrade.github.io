import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {moviesAPI} from '../services/MovieService'
import userReducer from './slices/user/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import { favoritesSlice } from './slices/favorites/favoritesSlice';
import { historySlice } from './slices/history/historySlice';
import addFavoritesToLocalStoreMiddleware from './middleware';

const persistConfig = {
  key: "root",
  storage,
  blacklist: [moviesAPI.reducerPath]
}

const rootReducer = combineReducers({
  historySlice: historySlice.reducer,
  favoritesSlice: favoritesSlice.reducer,
  userSlice: userReducer, 
  [moviesAPI.reducerPath]: moviesAPI.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(
        addFavoritesToLocalStoreMiddleware,
        moviesAPI.middleware)
  })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction< 
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const persistedStore = persistStore(store)
export default store;