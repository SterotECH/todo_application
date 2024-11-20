import {configureStore} from '@reduxjs/toolkit'
import { persistedTodoReducer } from './todo/todoSlice'
import { persistStore } from 'redux-persist'

export const store = configureStore({
    reducer: {
      todos: persistedTodoReducer,
    },
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
