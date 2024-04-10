import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
} from '../interfaces/user.interface';
import { User, UserModelDocument } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
  ) {}

  async getUser(id: string): Promise<GetUserResponse> {
    const user = await this.userModel
      .findById(id)
      .select('_id displayName photoURL email role status');

    return {
      data: user,
    };
  }

  async getAllUsers(id: string): Promise<GetUsersResponse> {
    const users = await this.userModel
      .find({
        _id: { $ne: id },
      })
      .select('_id username displayNamem photoURL role, status')
      .lean();

    return {
      data: users,
    };
  }

  async createUser(user: User): Promise<CreateUserResponse> {
    console.log('user', user);
    return { success: true };
  }
}
