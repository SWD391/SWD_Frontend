import { HubConnection } from '@microsoft/signalr';
import { createSlice } from "@reduxjs/toolkit"


  interface InitState {
    hub : HubConnection | null
  }
  
  const initialState: InitState = {
    hub: null
  }
  
  export const signalRSlice = createSlice({
      name: "signalR",
      initialState,
      reducers: {
          setHub(state, action) {
              state.hub = action.payload
          }
      },
  })
  
  export const { setHub } = signalRSlice.actions
  
  export const signalRReducer = signalRSlice.reducer