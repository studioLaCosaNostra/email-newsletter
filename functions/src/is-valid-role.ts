import { Role } from './interfaces/user-role';

export function isValidRole(role: Role) {
  return ['owner', 'admin', 'member']
    .some(validRole => role === validRole);
}
