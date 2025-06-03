import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  shopNames: string[];
  username: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
