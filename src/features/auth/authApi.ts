import { api } from '@/lib/axios';
import { LoginCredentials } from './loginSchema';
import { User } from '@/types/domain/user';
import { UserDto } from '@/types/api/userDTO';
import { adaptUserDto } from './userAdapter';
import { CustomMimeTypes } from '@/types/api/mimeTypes';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  userResourceUrl: string;
  userType: string;
}

export interface GetUserResponse {
  user: User;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const loginEndpoint = import.meta.env.VITE_LOGIN_ENDPOINT || "";
  
  const basicAuth = btoa(`${credentials.usernameOrEmail}:${credentials.password}`);
  
  const response = await api.post(
    loginEndpoint,
    {},
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
      validateStatus: (status) => {
        return status === 200 || status === 404;
      },
    }
  );
  
  const authHeader =
    response.headers.authorization || response.headers.Authorization;
  
  if (!authHeader) {
    throw new Error("No se recibió token de autenticación");
  }
  
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;
  
  const refreshTokenHeader =
    response.headers['x-refresh-token'] || response.headers['X-Refresh-Token'];


  if (!refreshTokenHeader) {
    throw new Error("No se recibió refresh token");
  }


  
  const refreshToken = refreshTokenHeader.startsWith("Bearer ")
    ? refreshTokenHeader.substring(7)
    : refreshTokenHeader;
  
  const userResourceUrl =
    response.headers['x-user-resource-url'] || response.headers['X-User-Resource-Url'];
  const userType =
    response.headers['x-user-type'] || response.headers['X-User-Type'];
  
  if (!userResourceUrl) {
    throw new Error("No se recibió URL del recurso de usuario");
  }
  
  if (!userType) {
    throw new Error("No se recibió tipo de usuario");
  }
  
  return { token, refreshToken, userResourceUrl, userType };
};

export const getUser = async (userResourceUrl: string, userType: string): Promise<GetUserResponse> => {
  const acceptHeader = 
    userType === 'EMPLOYEE' ? CustomMimeTypes.EMPLOYEE_V1 :
    userType === 'BUSINESS' ? CustomMimeTypes.BUSINESS_V1 :
    CustomMimeTypes.BENEFIT_PROVIDER_V1; 
  
  const userResponse = await api.get<UserDto>(userResourceUrl, {
    headers: {
      'Accept': acceptHeader,
    },
  });
  
  const userDto = userResponse.data;
  const user = adaptUserDto(userDto);
  
  return { user };
};