import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoginPayload {
  email: string
  password: string
}

interface AuthState {
  isLoggedIn: boolean
  error: string | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {},
    loginSuccess: (state) => {
      state.isLoggedIn = true
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions

export default authSlice.reducer
