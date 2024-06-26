import { AxiosError } from "axios";
import axiosClient from "./config";

export type AuthRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    _id: string;
    access_token: string;
  };
};

export type RegisterResponse = {
  status: boolean;
};

export const login = async (authData: AuthRequest): Promise<LoginResponse> => {
  try {
    // console.log(authData);
    // {email: 'nguyethanhlam091@gmail.com', password: 'Lamnguyen263'}
    const { data } = await axiosClient.post<AuthRequest, LoginResponse>(
      `/auth/signin`,
      authData
    );
    return {
      data,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    console.log(errData)
    throw errData;
  }
};

export const register = async (
  authData: AuthRequest
): Promise<RegisterResponse> => {
  try {
    // console.log(authData);
    const { status } = await axiosClient.post<AuthRequest, RegisterResponse>(
      `/auth/create`,
      authData
    );

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    console.log(errData)
    throw errData;
  }
};
