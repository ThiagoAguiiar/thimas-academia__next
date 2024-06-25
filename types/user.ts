export interface IPostUser {
  name: string;
  email: string;
  password: string;
  image: string | null;
  isProvider: boolean;
  isActive: boolean;
  isAdmin: boolean;
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

export interface IPutUser {
  userId: string;
  name: string;
  email: string;
  password?: string;
  image: string | null;
  isProvider: boolean;
  isActive: boolean;
  isAdmin: boolean;
}
