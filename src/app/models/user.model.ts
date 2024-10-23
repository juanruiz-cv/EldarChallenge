import { UserRole } from '@utils/enums';

interface UserBase {
  user: string;
  password: string;
}

interface User extends UserBase {
  id: number;
  role: UserRole;
}

export { UserBase, User };
