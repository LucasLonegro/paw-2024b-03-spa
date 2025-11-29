import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: number;
  email: string;
  username: string;
  phonenumber: string;
  verified: boolean;
  profilePicture: string;
  locale: string;
  dni: string;
  userType: 'PROVIDER' | 'BUSINESS' | 'EMPLOYEE';
}

export interface AuthState {
  user: User | null;      
  token: string | null;   
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  try {
    const user = userStr ? JSON.parse(userStr) : null;
    if (token && user) {
      return { token, user, isAuthenticated: true };
    }
  } catch (e) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return { token: null, user: null, isAuthenticated: false };
};



export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions

export const selectToken = (state: { auth: AuthState }) => state.auth.token
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated

export default authSlice.reducer

