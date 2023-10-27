import { configureStore } from '@reduxjs/toolkit'
import { authReducer, authSlice } from './slices/auth.slice'
import { signalRReducer, signalRSlice } from './slices/signalR.slice'
// ...

export const store = configureStore({
  reducer: {
    [authSlice.name]: authReducer,
    [signalRSlice.name]: signalRReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch