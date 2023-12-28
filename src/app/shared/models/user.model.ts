export interface IRegisterUserDto {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface ILoginDto {
  username: string;
  password: string;
}

export interface IJwtToken {
  role: string;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export interface IAdminAccount {
  username: string;
}
