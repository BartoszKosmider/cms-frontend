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
  name: string;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}
