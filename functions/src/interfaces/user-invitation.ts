import { Role } from './user-role';

export interface UserInvitation {
  email: string;
  newsletterId: string;
  role: Exclude<Role, 'owner'>;
}