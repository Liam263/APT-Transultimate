import { Customer } from '../models/customer.model';

export type CreateCustomerResponse = {
  status: boolean;
};

export type GetAllCustomerResponse = {
  data: Customer[];
};

export type GetCustomerByIdResponse = {
  data: Customer;
};
