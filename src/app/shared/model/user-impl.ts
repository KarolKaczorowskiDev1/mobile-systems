import { User } from 'src/app/shared/model/user';
import { Role } from 'src/app/shared/model/enums/role';

export class UserImpl implements User {
  uid!: string;
  email!: string;
  role!: Role;
  id?: string;

  get isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }

  static create(user: User) {
    return Object.assign(new UserImpl(), user);
  }
}
