import { AxiosError } from "axios";
import axiosClient from "./config";
import { GeneralStatus, Role } from "@/lib/enum";

export type User = {
  _id: string;
  fullName: string;
  position: string;
  mobile: string;
  branch: string;
  role: Role;
  email: string;
  password: string;
  photoUrl: string;
  location: string;
  dateCommenced: string;
  dateCeasedStatus: string;
  status: GeneralStatus;
  additionalInfo: DriverScheduler;
};

export type DriverScheduler = {
  licenceNumber: string;
  licenceExpiryDate: Date;
  medicalDueDate: Date;
  lastMedicalDate: Date;
  accreditations: string;
  accreditedTraining: Date;
  nhvasFatigueAccredited: Date;
  nhvasEntryDate: Date;
  nhvasExitDate: Date;
};

export type GetCurrentUserResponse = {
  data: User;
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const { data } = await axiosClient.get<GetCurrentUserResponse>(`/user`);

    const user = data.data;

    return user;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};
