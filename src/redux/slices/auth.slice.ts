import { createSlice } from "@reduxjs/toolkit"

  interface User {
        uid: string,
        email: string,
        fullName: string,
        photoUrl: string,
  }

  interface InitState {
    user : User | null
  }
  
  const initialState: InitState = {
        user: null
  }
  
  export const authSlice = createSlice({
      name: "auth",
      initialState,
      reducers: {
          setUser(state, action) {
              state.user = action.payload
          }
      },
  })
  
  export const { setUser } = authSlice.actions
  
  export const authReducer = authSlice.reducer