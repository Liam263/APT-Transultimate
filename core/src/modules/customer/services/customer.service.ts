import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Customer, CustomerModelDocument } from '../models/customer.model';
import { CustomerData } from '../dtos/customer.dtos';
import { User, UserModelDocument } from 'src/modules/users/models/user.model';
import { encodePassword } from 'src/utils/bcrypt';
import { Role } from 'src/enums/enum';
import {
  CreateCustomerResponse,
  GetAllCustomerResponse,
  GetCustomerByIdResponse,
} from '../interfaces/customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserModelDocument>,
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerModelDocument>,
  ) {}

  async getAllCustomer(): Promise<GetAllCustomerResponse> {
    const customers = await this.customerModel
      .find()
      .select('-hash -timestamp')
      .populate('userId', '_id displayName photoURL email status role')
      .lean();

    return {
      data: customers,
    };
  }

  async getCustomerById(
    customerId: Types.ObjectId,
  ): Promise<GetCustomerByIdResponse> {
    const normalizedRoomId = customerId.id;

    const customer = await this.customerModel.findById(normalizedRoomId);

    return {
      data: customer,
    };
  }

  async createCustomer(
    customerData: CustomerData,
  ): Promise<CreateCustomerResponse> {
    try {
      // Create customer tenant
      const createCustomer = new this.customerModel({
        ...customerData,
      });

      const newCustomer = await createCustomer.save();

      // Create the customer tenantId
      const existingUser = await this.userModel
        .findOne({ email: customerData?.email })
        .exec();

      // Check if user is exiting
      if (existingUser) {
        throw new ConflictException('User is exited');
      } else {
        const hash = encodePassword(customerData?.password);

        const createCustomerUser = new this.userModel({
          email: customerData?.email,
          fullName: customerData?.displayName,
          hash,
          role: Role.Customer,
          customerId: newCustomer._id,
        });

        await createCustomerUser.save();
      }

      return {
        status: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
