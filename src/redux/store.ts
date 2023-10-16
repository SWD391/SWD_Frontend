import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from './slices/auth.slice'
// ...

export const store = configureStore({
  reducer: {
    [authSlice.name]: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch