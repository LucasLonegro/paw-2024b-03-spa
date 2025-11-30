import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/types/domain/user"


export interface AuthState {
  user: User | null;      
  token: string | null;
  refreshToken: string | null;   
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const userStr = localStorage.getItem('user');
  
  try {
    const user = userStr ? JSON.parse(userStr) : null;
    if (token && user) {
      return { token, refreshToken, user, isAuthenticated: true };
    }
  } catch (e) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  return { token: null, refreshToken: null, user: null, isAuthenticated: false };
};



export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
})

export const { setTokens, setUser, logout } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated


export default authSlice.reducer

