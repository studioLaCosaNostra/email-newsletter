export type Role = 'owner' | 'admin' | 'member';

export interface UserRole {
  readonly email: string;
  readonly newsletterId: string;
  readonly newsletter: string;
  readonly uid: string;
  readonly role: Role;
}