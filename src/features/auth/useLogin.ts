import { useMutation } from '@tanstack/react-query';
import { login, getUser } from './authApi';
import { useAppDispatch } from '@/app/hooks';
import { setTokens, setUser } from './authSlice';
import { LoginCredentials } from './loginSchema';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const loginData = await login(credentials);
      
      dispatch(setTokens({
        token: loginData.token,
        refreshToken: loginData.refreshToken,
      }));
      
      const userData = await getUser(loginData.userResourceUrl, loginData.userType);
      
      dispatch(setUser({
        user: userData.user,
      }));
      
      return {
        user: userData.user,
        token: loginData.token,
        refreshToken: loginData.refreshToken,
      };
    },
  });
};