import { GeneralStatus, Role } from "@/lib/enum";
import { AxiosError } from "axios";
import axiosClient from "./config";
import { User } from "./user";

export type CreateAccreditationRequest = {
  accreditationName: string;
};

export type CreateTraningModuleRequest = {
  trainingModulesName: string;
};

export type CreateDepartmentRequest = {
  departmentName: string;
  status: GeneralStatus;
};

export type SuccessResponse = {
  status: boolean;
};

export type Customer = {
  _id: string;
  businessName: string;
  abn: string;
  contactName: string;
  mobile: string;
  email: string;
  fullName: string;
  password: string;
  photoUrl?: string;
  companyLogo?: string;
  status: GeneralStatus;
  createdAt: string;
  userId: User;
};

type Accreditation = {
  _id: string;
  accreditationName: string;
};

type TraningModule = {
  _id: string;
  traningModuleName: string;
};

type Department = {
  _id: string;
  departmentName: string;
  status: GeneralStatus;
};

export type GetAllCustomerResponse = {
  data: Customer[];
};

export type GetAllUserResponse = {
  data: User[];
};

export type GetDepartments = {
  data: Department[];
};

export type GetAccreditations = {
  data: Accreditation[];
};

export type GetTraningModules = {
  data: TraningModule[];
};

export const createCustomer = async (
  createCustomerData: Customer
): Promise<SuccessResponse> => {
  try {
    const { status } = await axiosClient.post<Customer, SuccessResponse>(
      `/customer`,
      createCustomerData
    );

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const createUser = async (
  createUserData: User
): Promise<SuccessResponse> => {
  try {
    const { status } = await axiosClient.post<User, SuccessResponse>(
      `/auth/create`,
      createUserData
    );

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const createAccreditation = async (
  createAccreditationData: CreateAccreditationRequest
): Promise<SuccessResponse> => {
  try {
    const { status } = await axiosClient.post<
      CreateAccreditationRequest,
      SuccessResponse
    >(`/accreditation`, createAccreditationData);

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const CreateDepartment = async (
  createDeparmentData: CreateDepartmentRequest
): Promise<SuccessResponse> => {
  try {
    const { status } = await axiosClient.post<
      CreateDepartmentRequest,
      SuccessResponse
    >(`/department`, createDeparmentData);

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const CreateTraningModule = async (
  createTraningModuleData: CreateTraningModuleRequest
): Promise<SuccessResponse> => {
  try {
    const { status } = await axiosClient.post<
      CreateAccreditationRequest,
      SuccessResponse
    >(`/trainingModules`, createTraningModuleData);

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getAccreditations = async (): Promise<Accreditation[]> => {
  try {
    const { data } = await axiosClient.get<GetAccreditations>(`/accreditation`);

    const accreditations = data.data;

    return accreditations;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getDepartments = async (): Promise<Department[]> => {
  try {
    const { data } = await axiosClient.get<GetDepartments>(`/department`);

    const departments = data.data;

    return departments;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getTraningModules = async (): Promise<TraningModule[]> => {
  try {
    const { data } = await axiosClient.get<GetTraningModules>(
      `/training-modules`
    );

    const trainingModules = data.data;

    return trainingModules;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getAllCustomer = async (): Promise<Customer[]> => {
  try {
    const { data } = await axiosClient.get<GetAllCustomerResponse>(`/customer`);

    const customers = data.data;

    return customers;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getAllUser = async (): Promise<User[]> => {
  try {
    const { data } = await axiosClient.get<GetAllUserResponse>(`/user`);

    const users = data.data;

    return users;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};
