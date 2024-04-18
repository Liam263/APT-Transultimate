import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Customer,
  CustomerModelDocument,
} from '../../../modules/customer/models/customer.model';
import { User, UserModelDocument } from 'src/modules/users/models/user.model';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { AuthLoginDto } from '../dtos/auth.dtos';
import {
  CreateUserResponse,
  SigninResponse,
} from '../interfaces/auth.interface';
import { UserDto } from '../../users/dtos/user.dtos';
import { omit } from 'lodash';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserModelDocument>,
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerModelDocument>,
    private jwtService: JwtService,
  ) {}

  async create(
    newUser: UserDto,
    customerId: Types.ObjectId,
  ): Promise<CreateUserResponse> {
    try {
      console.log("new User ", newUser)
      const existingUser = await this.userModel
        .findOne({ email: newUser.email })
        .exec();

      if (existingUser) {
        throw new ConflictException('User is existed');
      }

      const hash = encodePassword(newUser.password);

      const customerObjId = new Types.ObjectId(customerId);

      const userObject = {
        ...omit(newUser, 'password'),
        customerId: customerObjId,
        hash,
      };

      const createUser = new this.userModel(userObject);

      await createUser.save();

      return {
        status: true,
      };
    } catch (error) {
      console.log('Error creating user');
      throw error;
    }
  }

  async signIn({ email, password }: AuthLoginDto): Promise<SigninResponse> {
    try {
      const user = await this.userModel.findOne({ email });
      // console.log(email);
      // console.log(password);
      console.log(encodePassword(password));
      console.log(user);
      if (!user) {
        throw new HttpException(
          `Email or password is incorrect`,
          HttpStatus.NOT_FOUND,
        );
      }
      const isMatchPassword = comparePassword(password, user.hash);

      if (!isMatchPassword) {
        throw new UnauthorizedException();
      }

      return {
        _id: user?.id,
        access_token: this.jwtService.sign({
          _id: user?.id,
          email: user.email,
          displayName: user.fullName,
          role: user.role,
          customerId: user.customerId,
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}

// console.log(encodePassword('Lamnguyen263'));
