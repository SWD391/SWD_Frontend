import { createSlice } from "@reduxjs/toolkit";

interface User {
  accountId: string;
  email: string;
  firstName: string;
  lastName?: string;
  imageUrl: string;
  birthdate?: Date;
  role: UserRole;
  address?: string;
  phoneNumber?: string;
}

interface InitState {
  user: User | null;
}

const initialState: InitState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;

enum UserRole {
  FeedbackPerson,
  Employee,
  AdministratorStaff,
  AdministratorManager,
}

export const getRole = (role: UserRole): string => {
  switch (role) {
    case 0:
      return "Feedback Person";
    case 1:
      return "Employee";
    case 2:
      return "Administrator Staff";
    case 3:
      return "Administrator Manager";
    default:
      return ""; // Handle invalid role numbers appropriately in your application
  }
};
