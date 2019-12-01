import { Role } from './interfaces/user-role';

export interface SetUserRoleData {
  newsletterId: string;
  email: string;
  role: Role;
}
