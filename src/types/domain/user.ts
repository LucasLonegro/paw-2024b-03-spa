// Campos comunes a todos los tipos de usuario
export interface BaseUser {
    id: number;
    email: string;
    username: string;
    phonenumber: string;
    verified: boolean;
    profilePictureURI: string;
    locale: string;
    dni: string;
    selfURI: string;
  }
  
  export interface ProviderUser extends BaseUser {
    userType: 'PROVIDER';

  }
  
  // Usuario tipo BUSINESS
  export interface BusinessUser extends BaseUser {
    userType: 'BUSINESS';
    teamsURI: string;
    bookingsURI: string;
    bookingsOrdersURI: string;
  }
  


  // Usuario tipo EMPLOYEE
  export interface EmployeeUser extends BaseUser {
    userType: 'EMPLOYEE';
    teamsURI?: string;
    employerURI?: string;
  }
  
  export type User = ProviderUser | BusinessUser | EmployeeUser;
  