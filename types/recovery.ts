export interface IPostRecovery {
  email: string;
  code: string;
  createdAt: string;
  expiresAt: string;
  isValid: boolean;
}
