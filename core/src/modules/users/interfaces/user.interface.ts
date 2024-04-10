import { User } from '../models/user.model';

export type GetUserResponse = {
  data: User;
};

export type GetUsersResponse = {
  data: User[];
};

export type CreateUserResponse = {
  success: boolean;
};
