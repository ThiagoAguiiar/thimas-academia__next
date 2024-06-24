export interface IPostuser {
  name: string;
  email: string;
  password: string;
  image: string | null;
  isProvider: boolean;
  isActive: boolean;
  isAdmin: string;
}

export interface IGetUser {
  userId: string;
  name: string;
  email: string;
  password: string | null;
  image: string | null;
  isProvider: boolean;
  isActive: boolean | string;
  isAdmin: boolean | string;
}
