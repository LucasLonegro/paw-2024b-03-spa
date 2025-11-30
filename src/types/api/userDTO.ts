export interface BaseUserDto {
    id: number;
    email: string;
    username: string;
    phonenumber: string;
    verified: boolean;
    locale: string;
    dni: string;
    links: {
        profilePicture: string;
        self: string;
    };
}

// DTO para usuario tipo PROVIDER
export interface ProviderUserDto extends BaseUserDto {
  userType: 'PROVIDER';
}

// DTO para usuario tipo BUSINESS
export interface BusinessUserDto extends Omit<BaseUserDto, 'links'> {
  userType: 'BUSINESS';
  links: BaseUserDto['links'] & {
    teams: string;
    bookings: string;
    bookingsOrders: string;
  };
}

// DTO para usuario tipo EMPLOYEE
export interface EmployeeUserDto extends Omit<BaseUserDto, 'links'> {
  userType: 'EMPLOYEE';
  links: BaseUserDto['links'] & {
    employer: string;
    teams: string;
  };
}

export type UserDto = ProviderUserDto | BusinessUserDto | EmployeeUserDto;

export const isProviderUserDto = (dto: UserDto): dto is ProviderUserDto => {
    return dto.userType === 'PROVIDER';
  };
  
  export const isBusinessUserDto = (dto: UserDto): dto is BusinessUserDto => {
    return dto.userType === 'BUSINESS';
  };
  
  export const isEmployeeUserDto = (dto: UserDto): dto is EmployeeUserDto => {
    return dto.userType === 'EMPLOYEE';
  };