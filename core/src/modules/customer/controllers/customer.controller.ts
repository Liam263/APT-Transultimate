import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Types } from 'mongoose';
import { CustomerData } from '../dtos/customer.dtos';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/enum';
import { CreateCustomerResponse } from '../interfaces/customer.interface';

@Roles(Role.Admin)
@Controller('customer')
export class CustomerController {
  constructor(private customerSerive: CustomerService) {}

  @Get()
  async getAllCustomers(): Promise<any> {
    return this.customerSerive.getAllCustomer();
  }

  @Get(':id')
  async getCustomerById(@Param() customerId: Types.ObjectId): Promise<any> {
    return this.customerSerive.getCustomerById(customerId);
  }

  @Post()
  async createCustomer(
    @Body() customerData: CustomerData,
  ): Promise<CreateCustomerResponse> {
    console.log('here');
    return this.customerSerive.createCustomer(customerData);
  }
}
