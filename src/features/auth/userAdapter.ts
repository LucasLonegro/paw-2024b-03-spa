import { User, ProviderUser, BusinessUser, EmployeeUser } from '@/types/domain/user';
import {
  UserDto,
  ProviderUserDto,
  BusinessUserDto,
  EmployeeUserDto,
  isProviderUserDto,
  isBusinessUserDto,
  isEmployeeUserDto,
} from '@/types/api/userDTO';



const adaptProviderUser = (dto: ProviderUserDto): ProviderUser => {
  return {
    id: dto.id,
    email: dto.email,
    username: dto.username,
    phonenumber: dto.phonenumber,
    verified: dto.verified,
    profilePictureURI: dto.links.profilePicture,
    locale: dto.locale,
    dni: dto.dni,
    userType: 'PROVIDER',
    selfURI: dto.links.self,
  };
};

const adaptBusinessUser = (dto: BusinessUserDto): BusinessUser => {
  return {
    id: dto.id,
    email: dto.email,
    username: dto.username,
    phonenumber: dto.phonenumber,
    verified: dto.verified,
    profilePictureURI: dto.links.profilePicture,
    locale: dto.locale,
    dni: dto.dni,
    userType: 'BUSINESS',
    teamsURI: dto.links.teams,
    bookingsURI: dto.links.bookings,
    bookingsOrdersURI: dto.links.bookingsOrders,
    selfURI: dto.links.self,
  };
};

const adaptEmployeeUser = (dto: EmployeeUserDto): EmployeeUser => {
  return {
    id: dto.id,
    email: dto.email,
    username: dto.username,
    phonenumber: dto.phonenumber,
    verified: dto.verified,
    profilePictureURI: dto.links.profilePicture,
    locale: dto.locale,
    dni: dto.dni,
    userType: 'EMPLOYEE',
    teamsURI: dto.links.teams,
    employerURI: dto.links.employer,
    selfURI: dto.links.self,
  };
};

export const adaptUserDto = (dto: UserDto): User => {
  if (isProviderUserDto(dto)) {
    return adaptProviderUser(dto);
  }
  
  if (isBusinessUserDto(dto)) {
    return adaptBusinessUser(dto);
  }
  
  if (isEmployeeUserDto(dto)) {
    return adaptEmployeeUser(dto);
  }
  
  throw new Error(`Tipo de usuario desconocido: ${(dto as UserDto).userType}`);
};

