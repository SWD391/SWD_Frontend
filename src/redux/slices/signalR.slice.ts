import { NotificationDetails } from '@/app/admin/staff/feedbacks/page';
import { HubConnection } from '@microsoft/signalr';
import { createSlice } from "@reduxjs/toolkit"


  interface InitState {
    hub : HubConnection | null,
    notifications: NotificationDetails[]
  }
  
  const initialState: InitState = {
    hub: null,
    notifications: []
  }
  
  export const signalRSlice = createSlice({
      name: "signalR",
      initialState,
      reducers: {
          setHub(state, action) {
              state.hub = action.payload
          },
          setNotifications(state, action){
            state.notifications = action.payload
          }
      },
  })
  
  export const { setHub, setNotifications } = signalRSlice.actions
  
  export const signalRReducer = signalRSlice.reducer